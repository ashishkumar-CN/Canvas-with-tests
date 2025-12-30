import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "@/redux/order/action";
import { addAddress } from "@/redux/address/action";
import { toast } from "sonner";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: ""
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleCheckout = async () => {
    if (!formData.firstName || !formData.addressLine1 || !formData.phoneNumber) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const addressRequest = {
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phoneNumber,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        country: "India", // Default or add to form
        zipCode: formData.zipCode,
        isDefault: true
      };

      // Step 1: Add Address
      const savedAddress = await dispatch(addAddress(addressRequest) as any);

      // Step 2: Create Order
      const orderRequest = {
        addressId: savedAddress.id
      };

      await dispatch(createOrder(orderRequest) as any);

      setShowSuccess(true);
      clearCart();
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 max-w-5xl relative">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Form */}
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
              <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
            </div>
            <Input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} />
            <Input name="addressLine1" placeholder="Address Line 1" value={formData.addressLine1} onChange={handleChange} />
            <Input name="addressLine2" placeholder="Address Line 2" value={formData.addressLine2} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
              <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            </div>
            <Input name="zipCode" placeholder="Pincode" value={formData.zipCode} onChange={handleChange} />

            <Button
              className="w-full mt-4"
              onClick={handleCheckout}
            >
              Place Order
            </Button>
          </div>

          <div className="md:col-span-2 space-y-4 mt-8">
            <h3 className="text-lg font-semibold">Payment Method</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="border p-4 rounded-lg flex items-center space-x-3 cursor-pointer bg-secondary/50">
                <input type="radio" name="payment" id="cod" defaultChecked className="h-4 w-4" />
                <label htmlFor="cod" className="flex-1 font-medium cursor-pointer">Cash on Delivery (COD)</label>
              </div>
              <div className="border p-4 rounded-lg flex items-center space-x-3 cursor-not-allowed opacity-50">
                <input type="radio" name="payment" id="online" disabled className="h-4 w-4" />
                <label htmlFor="online" className="flex-1 font-medium">Online Payment (Coming Soon)</label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-4 h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>
            {items.map(item => (
              <div key={item.id} className="flex justify-between text-sm mb-2">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="border-t my-2"></div>
            <div className="flex justify-between mb-2 font-bold">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* SUCCESS POPUP */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 text-center w-80">
              <h2 className="text-xl font-semibold mb-2">
                Order Successful 🎉
              </h2>
              <p className="text-gray-600 mb-4">
                Your order has been placed successfully.
              </p>
              <Button
                onClick={() => {
                  setShowSuccess(false);
                  navigate("/");
                }}
                className="w-full"
              >
                OK
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
