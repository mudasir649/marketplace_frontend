import { ArrowDropDown } from '@mui/icons-material'
import React, { useState } from 'react'

export default function ListDownComponent() {
    const [language, setLanguage] = useState<string>('En');
    const [showList, setShowList] = useState<Boolean>(false);

    const liStyle = 'cursor-pointer hover:text-[#FF0000] hover:w-7';

    const handleLanguage = (value: string) => {
        setLanguage(value);
        setShowList(false);
    }

    return (
        <div>
            <div className="flex flex-row cursor-pointer">
                <span>{language}</span>
                <ArrowDropDown className="mt-[-2px]" onClick={() => setShowList(!showList)} />
            </div>
            {showList &&
                <ul className="absolute bg-white text-black w-11 p-3 border space-y-2" data-aos="fade-up">
                    <li className={liStyle} onClick={() => handleLanguage('EN')}>EN</li>
                    <li className={liStyle} onClick={() => handleLanguage('DE')}>DE</li>
                    <li className={liStyle} onClick={() => handleLanguage('FR')}>FR</li>
                    <li className={liStyle} onClick={() => handleLanguage('ES')}>ES</li>
                    <li className={liStyle} onClick={() => handleLanguage('IT')}>IT</li>
                </ul>}
        </div>
    )
}
