import React from 'react';


const GroupDetails = ({chatRoom}) => {

    const Attachment = 'bg-borderColor text-white h-[45px] w-[45px] rounded-full text-[12px] flex items-center justify-center cursor-pointer font-normal'

  return (
    <aside className='shadow-md shadow-black w-[20vw] hidden h-screen bg-[#f3f3f3bf] flex-col items-center pt-9 gap-[33px] lg:flex'>
        <img src={chatRoom?.image} alt="Group Image" style={{height: '150px', width: '150px', borderRadius: '50%'}} />
        <h3 className='text-black text-[1.1rem] font-normal'>{chatRoom?.name}</h3>
        <h4 className='text-[1.1rem] font-normal mt-[3rem]'>Attachments</h4>
        <div className='flex gap-[19px]'>
            <div className={Attachment}>media</div>
            <div className={Attachment}>links</div>
            <div className={Attachment}>docs</div>
        </div>
    </aside>
  );
}

export default GroupDetails;
