import { useTranslations } from "next-intl";
import directoryData from "../data/directoryData";

export default function LocaleHomePage() {
  const t_category = useTranslations('category');
  const t_root = useTranslations();
  const t_sub = useTranslations('subcategory');

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{t_root("brand_categories")}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(directoryData).map(([category, brands]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">{t_category(category)}</h3>
            {Array.isArray(brands) ? (
              <ul>
                {brands.map((brand) => (
                  <li key={brand}>{brand}</li>
                ))}
              </ul>
            ) : (
              <ul>
                {Object.entries(brands).map(([subCategory, subBrandList]) => (
                  <li key={subCategory} className="mt-2">
                    <strong>
                      {category === 'restaurant_chains'
                        ? t_category(`restaurant_subcategories.${subCategory}`)
                        : t_sub(subCategory)}:
                    </strong>
                    {Array.isArray(subBrandList) ? (
                      <ul>
                        {(subBrandList as string[]).map((brandName) => (
                          <li key={brandName}>{brandName}</li>
                        ))}
                      </ul>
                    ) : (
                      Object.entries(subBrandList)
                          .map(
                            ([deepCategory, deepBrandsValue]) =>
                              `${category === 'restaurant_chains' ? t_category(`restaurant_subcategories.${deepCategory}`) : t_sub(deepCategory)}: ${(deepBrandsValue as string[]).join(", ")}`
                          )
                          .join("; ")
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}