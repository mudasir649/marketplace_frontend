import { ArrowDropDown, KeyboardArrowDown } from '@mui/icons-material'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import i18n from 'i18next';

export default function ListDownComponent() {
    const [language, setLanguage] = useState<string>(i18n.language); // Initialize with the current language
    const [showList, setShowList] = useState<Boolean>(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const handleOutsideClick = useCallback((event: MouseEvent) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
            setShowList(false);
        }
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        }
    }, [handleOutsideClick])

    const liStyle = 'cursor-pointer hover:text-white hover:bg-[#FF0000] hover:border hover:border-[#FF0000] hover:rounded-sm hover:w-7 hover:p-1 ease-in duration-200';

    const handleLanguage = (value: string, value2: string) => {
        setLanguage(value2);
        setShowList(false);
        i18n.changeLanguage(value);
    }

    // Update the selected language in state when i18next language changes
    useEffect(() => {
        setLanguage(i18n.language);
    }, []);

    return (
        <div onClick={() => setShowList(!showList)} ref={dropdownRef}>
            <div className="flex flex-row cursor-pointer">
                <span>{language}</span>
                <KeyboardArrowDown fontSize='small' className={`logo ${showList ? 'active': 'inactive'} h-5 w-5 text-[#FF0000] mt-[0.8px]`} />
            </div>
            {showList &&
                <ul className="absolute bg-white text-black w-11 p-2 border space-y-2 z-20" data-aos="fade-up">
                    <li className={liStyle} onClick={() => handleLanguage('EN', 'EN')}>EN</li>
                    <li className={liStyle} onClick={() => handleLanguage('DE', 'DE')}>DE</li>
                    <li className={liStyle} onClick={() => handleLanguage('FR', 'FR')}>FR</li>
                    <li className={liStyle} onClick={() => handleLanguage('ES', 'ES')}>ES</li>
                    <li className={liStyle} onClick={() => handleLanguage('IT', 'IT')}>IT</li>
                </ul>}
        </div>
    )
}
