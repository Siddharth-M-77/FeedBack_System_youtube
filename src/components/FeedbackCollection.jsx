import React, { useEffect, useState } from 'react';

const FeedbackCollection = () => {
    const [formData, setFormData] = useState({
        feedbackType: '',
        name: '',
        email: '',
        comment: '',
        rating: '',
    });
    const [allfeedbacks, setAllFeedBacks] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        const feedBackFromLS = JSON.parse(localStorage.getItem('feedbacks'));
        if (feedBackFromLS) {
            setAllFeedBacks(feedBackFromLS);
        } else {
            setAllFeedBacks([]);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newfeedback = [...allfeedbacks, formData];
        setAllFeedBacks(newfeedback);

        localStorage.setItem('feedbacks', JSON.stringify(newfeedback));
        alert('Feedback submitted successfully!');

        setFormData({
            feedbackType: '',
            name: '',
            email: '',
            comment: '',
            rating: '',
        });
    };

    const groupFeedBackByType = () => {
        const groupFeedBack = {};
        allfeedbacks.forEach((feedback) => {
            const type = feedback.feedbackType;

            if (!groupFeedBack[type]) {
                groupFeedBack[type] = { totalRating: 0, count: 0 };
            }
            groupFeedBack[type].totalRating += Number(feedback.rating);
            groupFeedBack[type].count += 1;
        });
        return groupFeedBack;
    };

    const groupFeedBack = groupFeedBackByType();

    return (
        <div className="container mx-auto bg-gradient-to-br from-gray-100 to-gray-200 shadow-xl rounded-lg mt-10 p-6 flex flex-col md:flex-row gap-10 justify-center items-center">
            {/* Feedback Form */}
            <form
                onSubmit={handleSubmit}
                className="p-6 w-full max-w-lg bg-white rounded-lg shadow-lg flex flex-col items-center gap-4"
            >
                <h1 className="text-4xl font-bold capitalize bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                    Feedback Form
                </h1>

                <select
                    value={formData.feedbackType}
                    onChange={handleChange}
                    name="feedbackType"
                    className="w-full bg-gray-200 px-4 py-2 rounded-lg shadow focus:ring focus:ring-blue-500"
                >
                    <option value="">Select Feedback Type</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Product Quality">Product Quality</option>
                </select>
                <input
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    name="name"
                    className="w-full bg-gray-200 px-4 py-2 rounded-lg shadow focus:ring focus:ring-blue-500"
                    placeholder="Enter your name..."
                />
                <input
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="w-full bg-gray-200 px-4 py-2 rounded-lg shadow focus:ring focus:ring-blue-500"
                    placeholder="Enter your email..."
                />
                <textarea
                    value={formData.comment}
                    onChange={handleChange}
                    name="comment"
                    rows={4}
                    className="w-full bg-gray-200 px-4 py-2 rounded-lg shadow focus:ring focus:ring-blue-500"
                    placeholder="Drop your valuable feedback..."
                ></textarea>
                <select
                    value={formData.rating}
                    name="rating"
                    onChange={handleChange}
                    className="w-full bg-gray-200 px-4 py-2 rounded-lg shadow focus:ring focus:ring-blue-500"
                >
                    <option value="">Choose Rating 🌟</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                </select>

                <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition">
                    Submit Feedback
                </button>
            </form>

            {/* Feedback Summary */}
            <div className="w-full md:w-2/3 bg-indigo-600 p-6 rounded-lg shadow-lg text-white">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Total Feedbacks: {allfeedbacks.length}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {Object.keys(groupFeedBack).length > 0
                        ? Object.keys(groupFeedBack).map((type) => {
                              const averageRating =
                                  groupFeedBack[type].totalRating /
                                  groupFeedBack[type].count;
                              return (
                                  <div
                                      key={type}
                                      className="p-4 bg-white rounded-lg text-indigo-800 shadow-lg"
                                  >
                                      <h3 className="text-xl font-semibold">
                                          {type}
                                      </h3>
                                      <p>
                                          <span className="font-bold">
                                              Avg Rating:
                                          </span>{' '}
                                          {averageRating.toFixed(1)}
                                      </p>
                                      <p>
                                          <span className="font-bold">
                                              Total Feedbacks:
                                          </span>{' '}
                                          {groupFeedBack[type].count}
                                      </p>
                                  </div>
                              );
                          })
                        : ''}
                </div>

                {allfeedbacks?.map((feedback, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded-lg text-indigo-800 shadow-lg mb-4"
                    >
                        <h4>
                            <span className="font-bold">Name:</span>{' '}
                            {feedback.name}
                        </h4>
                        <h4>
                            <span className="font-bold">Email:</span>{' '}
                            {feedback.email}
                        </h4>
                        <h4>
                            <span className="font-bold">Feedback Type:</span>{' '}
                            {feedback.feedbackType}
                        </h4>
                        <h4>
                            <span className="font-bold">Rating:</span>{' '}
                            {feedback.rating}
                        </h4>
                        <h4>
                            <span className="font-bold">Comment:</span>{' '}
                            {feedback.comment}
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeedbackCollection;
