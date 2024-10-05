import {useGlobal} from "../utils/UserContext"
const Contact = () => {
  const {dark} = useGlobal();
  return (
    <div className={`${dark ? "bg-gray-800 text-white" : "bg-white text-black"} h-[400px]`}>
      <a className="py-10 hover:underline my-auto" href="mailto:gkushal0806@gmail.com">Click here to send your query</a>
    </div>
  );
};

export default Contact;
