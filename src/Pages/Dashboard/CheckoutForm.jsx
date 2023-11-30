import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  //   const [cart, refetch] = useCart();
  const totalPrice = 20;
  //   const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("paymentMethod", paymentMethod);
      setError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymoys",
            name: user?.displayName || "anonymoys",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transactionId ID", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const paymentInfo = {
          email: user?.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date().toISOString(),
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", paymentInfo);

        const userRole = {
          role: "subscribed",
        };
        const userRoleChanged = await axiosSecure.patch(
          `/users/${user.email}`,
          userRole
        );
        console.log("role changed", userRoleChanged.data);
        console.log("payment saved", res.data);

        if (res.data?.paymentResult?.insertedId && userRoleChanged.data.modifiedCount>0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thank you for the taka paisa",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/userProfile");
        }
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-secondary bg-[#efab45] text-white my-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {error && <p className="text-xl text-red-600">!!!!!!!!{error}!!!!!!!!</p>}
      {transactionId && (
        <p className="text-xl text-green-600">
          {" "}
          Your transaction id: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
