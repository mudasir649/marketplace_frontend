import { ArrowDropDown } from '@mui/icons-material'
import React, { useState, useEffect } from 'react'
import i18n from 'i18next';

export default function ListDownComponent() {
    const [language, setLanguage] = useState<string>(i18n.language); // Initialize with the current language
    const [showList, setShowList] = useState<Boolean>(false);

    const liStyle = 'cursor-pointer hover:text-[#FF0000] hover:w-7';

    const handleLanguage = (value: string) => {
        setLanguage(value);
        setShowList(false);
        i18n.changeLanguage(value);
    }

    // Update the selected language in state when i18next language changes
    useEffect(() => {
        setLanguage(i18n.language);
    }, [i18n.language]);

    return (
        <div>
            <div className="flex flex-row cursor-pointer">
                <span>{language}</span>
                <ArrowDropDown className="mt-[-2px]" onClick={() => setShowList(!showList)} />
            </div>
            {showList &&
                <ul className="absolute bg-white text-black w-11 p-3 border space-y-2" data-aos="fade-up">
                    <li className={liStyle} onClick={() => handleLanguage('en')}>en</li>
                    <li className={liStyle} onClick={() => handleLanguage('de')}>de</li>
                    <li className={liStyle} onClick={() => handleLanguage('fr')}>fr</li>
                    <li className={liStyle} onClick={() => handleLanguage('es')}>es</li>
                    <li className={liStyle} onClick={() => handleLanguage('it')}>it</li>
                </ul>}
        </div>
    )
}
