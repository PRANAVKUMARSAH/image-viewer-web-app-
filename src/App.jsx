import React, { useState } from 'react';
import img1 from "./Images/Image1.jpg";
import img2 from "./Images/Image2.jpg";
import img3 from "./Images/Image3.jpg";
import img4 from "./Images/Image4.jpg";
import img5 from "./Images/Image5.jpg";
import img6 from "./Images/Image6.jpg";
import img7 from "./Images/Image7.jpg";
import img8 from "./Images/Image8.jpg";
import video9 from "./Images/video1.mp4";
import video10 from "./Images/video2.mp4";

function App() {
  const [selectedItem, setSelectedItem] = useState({ img: img1, type: 'photo' });
  const [filterOption, setFilterOption] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

  const handleClick = (item, index) => {
    setSelectedItem(item);
    setSelectedFileIndex(index);
  };

  const handleFilterChange = (option) => {
    setFilterOption(option);
  };

  const handleSortChange = (option) => {
    setSortBy(option);
  };

  const imageData = [
    { img: img1, date: '2024-02-09', time: '10:30', type: 'photo', name: 'A' },
    { img: img2, date: '2024-02-08', time: '12:45', type: 'photo', name: 'B' },
    { img: img3, date: '2024-02-09', time: '08:20', type: 'photo', name: 'C' },
    { img: img4, date: '2024-02-08', time: '14:30', type: 'photo', name: 'D' },
    { img: img5, date: '2024-02-09', time: '11:15', type: 'photo', name: 'E' },
    { img: img6, date: '2024-02-08', time: '09:45', type: 'photo', name: 'F' },
    { img: img7, date: '2024-02-09', time: '13:20', type: 'photo', name: 'G' },
    { img: img8, date: '2024-02-08', time: '15:40', type: 'photo', name: 'H' },
    { img: video9, date: '2024-02-08', time: '15:40', type: 'video', name: 'I' },
    { img: video10, date: '2024-02-08', time: '15:40', type: 'video', name: 'J' },
  ];

  const filteredData = () => {
    if (filterOption === 'all') return imageData;
    else if (filterOption === 'photo') return imageData.filter(item => item.type === 'photo');
    else if (filterOption === 'video') return imageData.filter(item => item.type === 'video');
  };

  const sortData = (data) => {
    if (sortBy === 'date') return data.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sortBy === 'time') return data.sort((a, b) => a.time.localeCompare(b.time));
    else if (sortBy === 'type') return data.sort((a, b) => a.type.localeCompare(b.type));
    else if (sortBy === 'name') return data.sort((a, b) => a.name.localeCompare(b.name));
  };

  const sortedData = sortData(filteredData());
  const totalFiles = sortedData.length; // Calculate total files based on filtered data

  return (
    <>
      <div className='w-full h-screen flex flex-col justify-between max-[768px]:w-full'>
        <div className='w-full h-[70%] bg-black rounded-3xl p-2 flex justify-center border-double border-4 border-red-500 max-[768px]:items-center max-[768px]:h-[65%]'>
          {selectedItem.type === 'photo' ? (
            <img src={selectedItem.img} alt="" className='w-[50%] h-full bg-cover max-[768px]:h-[80%] max-[768px]:w-[90%] ' />
          ) : (
            <video src={selectedItem.img} className='w-[50%] h-full max-[768px]:h-[80%] max-[768px]:w-[90%]' controls autoPlay />
          )}
        </div>

        <div className='border-2 border-black mx-1'></div>
        
        <div className='bg-black w-full h-[29.78%] rounded-3xl p-2 border-4 border-red-500 max-[768px]:h-[35%] max-[768px]:flex max-[768px]:flex-col max-[768px]:justify-center'>
          <div className='flex gap-20 bg-slate-900 w-full h-7 items-center max-[768px]:w-full max-[768px]:gap-0'>
            <p className='text-white px-1 text-sm'>
              File selected: {selectedFileIndex + 1} / {totalFiles} Files
            </p>

            <select onChange={(e) => handleFilterChange(e.target.value)}>
              <option value="all">Do Not Filter</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>

            <select onChange={(e) => handleSortChange(e.target.value)} className='pr-16 max-[768px]:pr-2' >
              <option value="date">Date</option>
              <option value="time">Time</option>
              <option value="type">Type</option>
              <option value="name">Name</option>
            </select>

          </div>
          <div className='flex justify-start gap-5 overflow-x-auto items-center border-double mt-1 bg-slate-900 px-10'>
            {sortedData.map((item, index) => (
              <ImageButton
                key={index}
                item={item}
                index={index}
                handleClick={handleClick}
                isActive={selectedItem.img === item.img}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const ImageButton = ({ item, index, handleClick, isActive }) => {
  return (
    <button
      className={`w-44 h-32 flex-shrink-0 ${isActive ? 'border-4 border-orange-500' : ''}`}
      onClick={() => handleClick(item, index)}
    >
      {item.type === 'photo' ? (
        <img src={item.img} alt="" className='w-full h-full' />
      ) : (
        <video src={item.img} alt="" className='w-full h-full' controls />
      )}
    </button>
  );
};

export default App;
