import React from 'react'
import { useFilesQuery } from '../services/coreApi'
import { useParams } from 'react-router-dom';
import CardFile from '../components/CardFile';


export default function TypeFile(){
    const {id,type} = useParams();
    const files = useFilesQuery({id,type});
    

    if(files.isLoading) return <div>Loading...</div>
    if(files.isError) return <div>Error</div>
    // console.log(files.data);


  return (
    <div>
      <div className='items-center top-0 mb-5'>
            <div className='w-5/6 mx-auto mt-8' >
                <div className='grid sm:grid-cols-2 md:grid-cols-3'>
                {files.data.map((file, index) => (
                    file ? (
                    <CardFile key={index} file={file}/>
                            ) : null
                        ))}
                </div>
            </div>
        </div>
    </div>
  )
}
