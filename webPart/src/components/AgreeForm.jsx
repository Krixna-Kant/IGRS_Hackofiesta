import React from 'react'

const AgreeForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <div className='bg-black h-96 w-auto mt-20 rounded-lg mx-5'>
            <div className=''>
                <h1>
                LIST OF SUBJECTS/TOPICS WHICH CAN NOT BE TREATED AS GRIEVANCES
                </h1>
                <p>
                    <ol type='1'>

                        <li>RTI Matter</li>
                        <li>Subjudice matters</li>
                        <li>Suggestions</li>
                        <li>Demand of financial assistance or Job.</li>
                        <li>Grievances of Government employees concerning their service matters including transfers unless they have used all available redressal options in their department.</li>
                    
                    </ol>
                </p>
            </div>
            <div className='flex space-x-3 ' >
                <div>
                    < input
                        type= 'checkbox'
                        className='w-6 h-6'
                    />   
                </div>
                <div>
                    <p>I agree that my grievance does not fall in any of the above listed categories.</p>
                </div>
            </div>
            <div className='flex justify-center items-center mt-16'>
                <input type="submit" className='w-2/5 h-10 font-bold text-white bg-red-600 rounded-lg'/>
            </div>
        </div>
        
    </form>
  )
}

export default AgreeForm
