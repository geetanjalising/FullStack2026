import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const notify = () => {
    if (email === "" || name === "")
      toast.warn("Please Fill all Details!");
    else
      toast.success("Message Sent Successfully!");
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_ei4ae0p', 'template_2bxt63i', form.current, 'sqRPyLodGgrxSMZxA')
      .then((result) => {
        console.log(result.text);
        console.log("message sent");
      }, (error) => {
        console.log(error.text);
      });
  };



  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h1>

        <form ref={form} onSubmit={sendEmail} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              name="from_name"
              onChange={(e) => setname(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              name="from_email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              placeholder="Type your message here..."
              required
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            onClick={notify}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );

};

export default Contact;
