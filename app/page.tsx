'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { directoryData } from './data/directoryData';
import { ArrowLeft, ChevronRight } from 'lucide-react';

const mainCategories = [
  { id: 'finance', gradient: 'bg-gradient-to-r from-pink-300 to-orange-300' },
  { id: 'telecom', gradient: 'bg-gradient-to-r from-pink-300 to-purple-300' },
  { id: 'shopping', gradient: 'bg-gradient-to-r from-green-300 to-green-400' },
  { id: 'restaurant_chains', gradient: 'bg-gradient-to-r from-purple-300 to-indigo-300' },
  { id: 'coffee_chains', gradient: 'bg-gradient-to-r from-orange-300 to-red-300' },
  { id: 'fashion', gradient: 'bg-gradient-to-r from-orange-300 to-red-300' }
];

const BrandListItem = ({ name }: { name: string }) => (
  <li>
    <a
      href="#"
      className="group flex items-center justify-between py-[3px] text-[13px] hover:underline hover:text-[#757575] dark:hover:text-gray-300 transition-colors duration-200"
    >
      <span>{name}</span>
      <ChevronRight className="w-[14px] h-[14px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
    </a>
  </li>
);

const BrandSection = ({ titleKey, brands, isSubCategory = false, subSections }: {
  titleKey: string;
  brands?: string[];
  isSubCategory?: boolean;
  subSections?: { [key: string]: string[] };
}) => {
  const { t } = useTranslation();
  const title = t(titleKey, titleKey.split('.').pop()?.replace(/_/g, ' ') || 'Section');

  return (
    <section>
      <h2 className={`text-[18px] font-medium mb-8 dark:text-gray-100 capitalize ${isSubCategory ? 'text-[16px] mb-4' : ''}`}>{title}</h2>
      {brands && (
        <ul className="space-y-[2px]">
          {brands.map(item => <BrandListItem key={item} name={item} />)}
        </ul>
      )}
      {subSections && (
        <div className="space-y-6">
          {Object.entries(subSections).map(([subKey, subBrands]) => (
            <div key={subKey}>
               <h3 className="text-[16px] font-medium mb-4 dark:text-gray-200 capitalize">
                 {t(`subcategory.${subKey}`, subKey.replace(/_/g, ' '))}
               </h3>
               <ul className="space-y-[2px]">
                 {subBrands.map(item => <BrandListItem key={item} name={item} />)}
               </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};


export default function HomePage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCardClick = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };

  const handleBackClick = () => {
    setSelectedCategory(null);
  };

  const shouldShowSection = (sectionId: string): boolean => {
    if (!selectedCategory) return true;
    if (selectedCategory === sectionId) return true;
    if (selectedCategory === 'shopping' && sectionId in directoryData.shopping) return true;
    if (selectedCategory === 'restaurant_chains' && sectionId === 'restaurant_chains') return true;
    if (selectedCategory === 'coffee_chains' && sectionId === 'coffee_chains') return true;
    if (selectedCategory === 'fashion' && sectionId === 'fashion') return true;
    return false;
  };


  return (
    <div className="w-full">
      {selectedCategory && (
        <button
          onClick={handleBackClick}
          className="flex items-center mb-6 text-[#222222] dark:text-gray-300 hover:text-[#757575] dark:hover:text-gray-100 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span>{t('back', 'Back')}</span>
        </button>
      )}

      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {mainCategories.map(category => {
              if (selectedCategory && selectedCategory !== category.id) {
                return null;
              }
              const textColor = category.id === 'fashion' ? 'text-black' : 'text-white';
              return (
                <div
                  key={category.id}
                  onClick={() => handleCardClick(category.id)}
                  className={`relative overflow-hidden rounded-lg h-32 flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-105 ${category.gradient} ${selectedCategory === category.id ? 'ring-2 ring-offset-2 dark:ring-offset-gray-900 ring-blue-500' : ''}`}
                >
                  <span className={`text-xl font-medium ${textColor}`}>
                    {t(`category.${category.id}`, category.id.replace(/_/g, ' '))}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-x-16 gap-y-12">

        {shouldShowSection('finance') && directoryData.finance && (
          <BrandSection titleKey="category.finance" brands={directoryData.finance} />
        )}

        {shouldShowSection('telecom') && directoryData.telecom && (
          <BrandSection titleKey="category.telecom" brands={directoryData.telecom} />
        )}

        {directoryData.shopping && Object.entries(directoryData.shopping).map(([shoppingKey, data]) => {
          if (!shouldShowSection(shoppingKey)) return null;

          if (shoppingKey === 'restaurant_chains' || shoppingKey === 'fashion') {
             return (
               <BrandSection
                 key={shoppingKey}
                 titleKey={`category.${shoppingKey}`}
                 subSections={data as { [key: string]: string[] }}
               />
             );
          } else if (Array.isArray(data)) {
             return (
               <BrandSection
                 key={shoppingKey}
                 titleKey={`subcategory.${shoppingKey}`}
                 brands={data}
               />
             );
          }
          return null;
        })}

      </div>
    </div>
  );
}