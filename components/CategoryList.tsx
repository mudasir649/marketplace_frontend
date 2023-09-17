import React from 'react'

export default function CategoryList({ setCategory, setExpand }: any) {

    const liStyle = 'hover:text-red-600 border-b border-gray-200';
    const handleClick = (value: any) => {
        setCategory(value);
        setExpand(false);
    }
    return (
        <div>
            <ul className='text-gray-500 space-y-1 cursor-pointer'>
                <li onClick={() => handleClick("Autos")} className={liStyle}>Autos</li>
                <li>
                    <h1 onClick={() => handleClick("Bikes")} className={liStyle}>Bikes</h1>
                    <ul className='mx-2'>
                        <li onClick={() => handleClick("Bicycles")} className={liStyle}>Bicycle</li>
                        <li onClick={() => handleClick("E-cycle")} className={liStyle}>E-cycle</li>
                        <li onClick={() => handleClick("E-scooter")} className={liStyle}>E-scooter</li>
                        <li onClick={() => handleClick("Motorcycle")} className={liStyle}>Motorcycle</li>
                    </ul>
                </li>
                <li onClick={() => handleClick("Boats")} className={liStyle}>
                    Boats
                </li >
                <li onClick={() => handleClick("Busses")} className={liStyle}>
                    Busses
                </li>
                <li onClick={() => handleClick("Construction Machines")} className={liStyle}>
                    Construction Machines
                </li>
                <li onClick={() => handleClick("Drones")} className={liStyle}>
                    Drones
                </li>
                <li onClick={() => handleClick("Others")} className={liStyle}>
                    Others
                </li>
                <li onClick={() => handleClick("Trailers")} className={liStyle}>
                    Trailers
                </li>
                <li onClick={() => handleClick("Trucks")} className={liStyle}>
                    Trucks
                </li>
                <li onClick={() => handleClick("Vans")} className={liStyle}>
                    Vans
                </li>
            </ul>
        </div>
    )
}
