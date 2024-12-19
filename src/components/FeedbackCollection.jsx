import React, { useEffect, useState } from 'react'

const FeedbackCollection = () => {
    const [formData, setFormData] = useState({
        feedbackType: '',
        name: '',
        email: '',
        comment: "",
        rating: ""
    })
    const [allfeedbacks, setAllFeedBacks] = useState([])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    console.log(allfeedbacks)

    useEffect(() => {
        const feedBackFromLS = JSON.parse(localStorage.getItem("feedbacks"))
        if (feedBackFromLS) {
            setAllFeedBacks(feedBackFromLS)
        }
        else {
            setAllFeedBacks([])
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const newfeedback = [...allfeedbacks, formData]
        setAllFeedBacks(newfeedback)

        localStorage.setItem("feedbacks", JSON.stringify(newfeedback))
        alert('Feedback submitted successfully!')

        setFormData({
            feedbackType: '',
            name: '',
            email: '',
            comment: "",
            rating: ""
        })
    }

    const groupFeedBackByType = () => {
        const groupFeedBack = {}
        allfeedbacks.forEach((feedback) => {
            const type = feedback.feedbackType

            if (!groupFeedBack[type]) {
                groupFeedBack[type] = { totalRating: 0, count: 0 }
            }
            groupFeedBack[type].totalRating += Number(feedback.rating)
            groupFeedBack[type].count += 1

        })
        return groupFeedBack;
    }

    const groupFeedBack = groupFeedBackByType()
    return (
        <div className='container mx-auto bg-white shadow-lg mt-5 flex items-center flex-col gap-10 justify-center'>
            <form onSubmit={handleSubmit} className='p-10 md:p-0 flex w-full max-w-lg  items-center justify-center flex-col'>
                <h1 className='text-4xl font-bold capitalize'>Feedback form</h1>
                <select value={formData.feedbackType} onChange={handleChange} name="feedbackType" className='w-full bg-gray-200 mt-5 mb-4 px-4 py-2 rounded-md border border-gray-400'>
                    <option value="">Select Feedback Type</option>
                    <option value="Customer Support">Customer Support</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Product Quality">Product Quality</option>
                </select>
                <input value={formData.name} onChange={handleChange} type="text" name='name' className='w-full  mt-5 mb-4 bg-gray-200 px-4 py-2 rounded-md border border-gray-400' placeholder='Enter your name...' />
                <input value={formData.email} onChange={handleChange} type="email" name='email' className='w-full mt-5 mb-4 bg-gray-200 px-4 py-2 rounded-md border border-gray-400' placeholder='Enter your Email...' />
                <textarea value={formData.comment} onChange={handleChange} name="comment" rows={4} className='w-full mt-5 mb-4 bg-gray-200 px-4 py-2 rounded-md border border-gray-400' placeholder='Drop your valuable feedback...'></textarea>
                <select value={formData.rating} name='rating' onChange={handleChange} className='w-full bg-gray-200 mt-5 mb-4 px-4 py-2 rounded-md border border-gray-400'>
                    <option value="">Choose rating🌟🌟🌟</option>
                    <option value="1">1. Poor</option>
                    <option value="2">2. Fair</option>
                    <option value="3">3. Good</option>
                    <option value="4">4. Very Good</option>
                    <option value="5">5.Excellent</option>
                </select>

                <button className='px-6 mt-4 w-full py-2 bg-blue-600 hover:bg-indigo-600 rounded-md border-none outline-none text-white'>Submit</button>
            </form>
            <div className='w-full lg:w-[70%] bg-indigo-600 p-10 rounded-md shadow-md'>
                <h1 className='text-4xl text-white  text-center  mb-4'>Total feedbacks: {allfeedbacks.length}</h1>

                <div className='w-full grid grid-cols-1 md:grid-cols-3 mx-auto gap-4 mb-5 justify-items-center'>
                    {

                        Object.keys(groupFeedBack).length > 0 ? (



                            Object.keys(groupFeedBack).map((type) => {

                                const averageRating = (
                                    groupFeedBack[type].totalRating / groupFeedBack[type].count)
                                return (
                                    <div className='card p-6 w-60 rounded-md  bg-white shadow-md '>
                                        <h3 className='font-bold text-xl '>{type}</h3>

                                        <h4 ><span className='font-bold'>Avarage Rating</span>:{averageRating}  </h4>
                                        <h4><span className='font-bold'>total feedback</span> :<span>{groupFeedBack[type].count}</span></h4>

                                    </div>
                                )
                            })

                        ) : ""
                    }

                </div>
                {
                    allfeedbacks?.map((feedback, index) => {
                        return (
                            <div key={index} className='flex p-4 rounded-md bg-white shadow-md flex-col items-start justify-between mb-5'>
                                <h2><span className='font-bold'>name:</span> {feedback.name}</h2>
                                <h2><span className='font-bold'>email:</span> {feedback.email}</h2>
                                <h2><span className='font-bold'>feedbackType:</span>  {feedback.feedbackType}</h2>
                                <h2><span className='font-bold'>rating:</span>  {feedback.rating}</h2>
                                <h2><span className='font-bold'>comment:</span>  {feedback.comment}</h2>
                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default FeedbackCollection
