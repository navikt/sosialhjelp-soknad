import {KategorierDtoDefinerteItem} from "../../../generated/new/model";

export const nodhjelpCategories: KategorierDtoDefinerteItem[] = [
    "NODHJELP_IKKE_BOSTED",
    "NODHJELP_IKKE_MAT",
    "NODHJELP_IKKE_STROM",
];

export const defaultCategories = (categories?: KategorierDtoDefinerteItem[]) => {
    if (!categories) {
        return [];
    }
    return [...categories, ...(categories.some((cat) => nodhjelpCategories.includes(cat)) ? ["NØDHJELP"] : [])];
};

interface FormValues {
    categories: string[];
}

const useCategories = <T extends FormValues>(
    selectedCategories: string[],
    setValue: (updatedCategories: string[]) => void,
    getValues: () => T,
    onSubmit: (formValues: T) => void
) => {
    const toggle = (category: string, subCategory?: string) => {
        let updatedCategories = selectedCategories;
        if (subCategory) {
            if (updatedCategories.includes(subCategory)) {
                updatedCategories = updatedCategories.filter((cat) => cat !== subCategory);
            } else {
                updatedCategories = [...updatedCategories, subCategory];
            }
        } else {
            // Rensk subCategories hvis NØDHJELP blir unselected
            if (updatedCategories.includes(category)) {
                if (category === "NØDHJELP") {
                    updatedCategories = updatedCategories.filter(
                        (cat) => !nodhjelpCategories.includes(cat as KategorierDtoDefinerteItem)
                    );
                }
                updatedCategories = updatedCategories.filter((cat) => cat !== category);
            } else {
                updatedCategories = [...updatedCategories, category];
            }
        }
        setValue(updatedCategories);
        onSubmit({...getValues(), categories: updatedCategories});
    };
    return {
        toggle,
    };
};

export default useCategories;
