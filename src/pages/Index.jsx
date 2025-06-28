import React from 'react';
import Note from '../components/Note';
import { PlusIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom';
const Index = () => {
    return (
        <section className='flex gap-6 px-2 mt-10 flex-wrap justify-center'>
            <Note/>
            <Note/>
            <Note/>
            <Note/>
            <Link to={"/create"} className="bg-teal-600 p-2 text-white rounded-full w-50 h-50 fixed bottom-5 right-10" >
                <PlusIcon width={30} height={30}/>
            </Link>
        </section>
    );
}

export default Index;
