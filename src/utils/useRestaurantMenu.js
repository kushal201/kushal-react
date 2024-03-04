import { useEffect, useState } from "react";
import { MENU_API, MENU_EXTEND_URL } from "./constant";

const useRestaurantMenu = (resId) => {

    const [resInfo, setResInfo] = useState(null);
    // need to fetch data
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(MENU_API + resId + MENU_EXTEND_URL);
        const json = await data.json();
        setResInfo(json.data);
    }
    return resInfo;
}

export default useRestaurantMenu;