// register form description here should be here

import React from 'react'

const RegisterForm = ({
    decide
})=> {

  return (
    <div className="min-h-screen">
    <div className="mx-auto max-w-xl px-6 py-12">
        <div className="bg-gradient-to-b from-red-950 to-black grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 rounded-xl">
            <h1 className='px-4 pt-4 pb-0 text-white font-bold text-xl md:col-span-2'>REGISTRATION FORM</h1>
            <div className="md:col-span-1 p-4 pt-1 pr-3 pb-0">
                <label htmlFor="firstName" className="text-white">
                    First Name<span className="text-red-500">*</span>
                </label>
                <input id="firstName" placeholder='First Name' type="text" className="w-full px-4 py-2 border rounded-md text-black text-l" required/>
            </div>
            <div className="md:col-span-1 p-4 pt-1 pl-3 pb-0">
                <label htmlFor="lastName" className="text-white">
                    Second Name<span className="text-red-500">*</span>
                </label>
                <input id="lastName" placeholder='Second Name' type="text" className="w-full px-4 py-2 border rounded-md text-black text-l" required/>
            </div>
            <div className="md:col-span-2 p-4 pb-2 pt-1">
                <label htmlFor="email" className="text-white">
                    E-mail<span className="text-red-500">*</span>
                </label>
                <input id="email" placeholder='E-mail' type="text" className="w-full px-4 py-2 border rounded-md text-black text-l" required/>
            </div>
            <div className='md:col-span-1 p-4 pt-1 pr-3 pb-0 w-full'>
                <label htmlFor="gender" className="text-white">
                    Gender<span className="text-red-500">*</span>
                </label>
                <select id="gender" className='w-48 rounded-md p-4 pb-2 pt-1' placeholder="Gender" required>
                    <option value="" disabled selected>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div className="md:col-span-1 p-4 pt-0 pr-3 pb-0">
                <label htmlFor="phone" className="text-white">
                    Phone<span className="text-red-500">*</span>
                </label>
                <input id="phone" placeholder='Phone' type="text" className="w-full px-4 py-2 border rounded-md text-black text-l" required/>
            </div>
            <div className="md:col-span-2 p-4 pb-2 pt-1">
                <label htmlFor="school" className="text-white">
                    Wizarding School<span className="text-red-500">*</span>
                </label>
                <input id="school" placeholder='Wizarding School' type="text" className="w-full px-4 py-2 border rounded-md text-black text-l" required/>
            </div>

            <div className="md:col-span-1 p-4 pt-1 pr-3 pb-0">
            <input id="terms" type="checkbox" className='p-2 w-4 h-4 mr-2' required/>
                    <label htmlFor="terms" className='text-white'>I agree to the Terms & Conditions<span className="text-red-500">*</span></label>
            </div>
            <div className='md:col-span-1 p-4 pb-2 pt-1 px-40 flex justify-between items-center'>  
                <button className='text-white bg-gradient-to-br from-red-950 to-black p-2' onClick={()=>decide(false)}>Submit</button>
            </div>
        </div>
    </div>
</div>
)
}

export default RegisterForm