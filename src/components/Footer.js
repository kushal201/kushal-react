import { useGlobal } from "../utils/UserContext"
const Footer = () => {
  const { dark } = useGlobal();
  return (
    <div className={`${dark ? "bg-gray-800 text-white border-t border-white" : "bg-orange-400 text-white"} p-[50px] flex justify-center`}>
      All Rights Reserved. ©Kushal Gidadhubli
    </div>
  );
};

export default Footer;
