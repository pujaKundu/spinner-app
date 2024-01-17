import React from "react";
import {
  Form,
  SpinnerDetails,
  UserForm,
  UserInformation,
  Wheel,
} from "../index";
import {
  useSpinnerState,
  useUserState,
  useUserInformation,
} from "../../utils/statesUtils";
import "./Home.css";
import {
  useSpinnerDetailState,
  useSpinnerInformation,
} from "../../utils/statesUtils";

const Home = () => {
  let sharedId = 1;

  const { isSpinnerOpen, setIsSpinnerOpen } = useSpinnerState();
  const {
    name,
    setName,
    email,
    setEmail,
    selectedDiscount,
    setSelectedDiscount,
    type,setType
  } = useUserState();

  const { userInformation, addUserInformation } = useUserInformation();

  const {
    setDiscountType,
    setColor,
    setDiscount,
    color,
    discountType,
    discount,
  } = useSpinnerDetailState();
  const { spinnerInformation, addSpinnerInformation } = useSpinnerInformation();

  const handleAddUser = (event) => {
    event.preventDefault();

    const newUserInfo = {
      id: sharedId++,
      name,
      email,
      type,
      selectedDiscount,
      
    };

    addUserInformation(newUserInfo);

    setName("");
    setEmail("");
    setSelectedDiscount("");
    setType("%")
  };

  const handleAddSpinnerInfo = (event) => {
    event.preventDefault();

    const newSpinnerInfo = {
      id: sharedId++,
      discount,
      discountType,
      color,
    };

    addSpinnerInformation(newSpinnerInfo);

    setIsSpinnerOpen(true);

    setDiscount("");
    setDiscountType("");
    setColor("#ffee99");
  };

  console.log('spin',spinnerInformation);
  console.log('user',userInformation)

  return (
    <div className="container">
      <div className="spinner-details-container">
        <Form
          color={color}
          setColor={setColor}
          discount={discount}
          setDiscount={setDiscount}
          discountType={discountType}
          setDiscountType={setDiscountType}
          setIsSpinnerOpen={setIsSpinnerOpen}
          handleAddSpinnerInfo={handleAddSpinnerInfo}
        />
        <SpinnerDetails spinnerInformation={spinnerInformation} />
      </div>

      <UserInformation userInformation={userInformation} />
      <div className="spinner-container">
        {isSpinnerOpen && (
          <UserForm
            setIsSpinnerOpen={setIsSpinnerOpen}
            setName={setName}
            setEmail={setEmail}
            handleAddUser={handleAddUser}
            selectedDiscount={selectedDiscount}
            setSelectedDiscount={setSelectedDiscount}
            spinnerInformation={spinnerInformation}
            type={type}
            setType={setType}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
