import React from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
const NoteForm = ({isCreate}) => {
    return (
        <section className=''>
            <h1 className='text-2xl font-bold mb-5'>
                {
                    isCreate ? " Create a new note" : "Edit your note"
                }</h1>
            <Link to={"/"} className='float-right'>
               <ArrowLeftIcon width={22}/>
            </Link>
            <form action="" className='mt-5'>
                <div className='mb-3'>
                    <label htmlFor="title"
                     className='font-medium block'>note title</label>
                    <input type="text" name="title" id="title"
                     className='font-medium border-teal-600 border-2 rounded-md w-full'/>
                </div>
                <div className='mb-5'>
                    <label htmlFor="description" className='font-medium block'>description</label>
                    <textarea rows={4} type="text" name="description" id="title"
                     className='font-medium border-teal-600 border-2 rounded-md w-full'/>
                </div>
                <button
                 className='text-white bg-teal-600 font-medium w-full text-center p-2 rounded-md'>Save</button>
            </form>
        </section>
    );
}

export default NoteForm;
