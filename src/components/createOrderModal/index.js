import { useState, useEffect } from "react";
import "../../assets/css/create_order.css";
import { FilterCloseIcon } from "../icons/FilterCloseIcon";

const CreateOrderModal = ({
                              makeOrder,
                              isActive,
                              onClose,
                              categoryId,
                              type,
                              address,
                              latitude,
                              longitude,
                              title,
                              description,
                              price,
                              startDate,
                              endDate,
                              photos,
                              files,
                              errorText, // Error from API
                          }) => {
    const [localError, setLocalError] = useState(""); // Store local error inside modal
    const [isButtonClicked, setIsButtonClicked] = useState(false); // Track if "Разместить" was clicked

    const enableBodyScroll = () => {
        document.body.style.overflow = "auto";
    };

    const createOrder = async () => {
        setIsButtonClicked(true); // Mark that the button was clicked
        setLocalError(""); // Clear previous errors before request

        await makeOrder(categoryId, type, address, latitude, longitude, title, description, price, startDate, endDate, photos, files);
    };

    // Show error inside modal only after button click
    useEffect(() => {
        if (isButtonClicked && errorText) {
            setLocalError(errorText);
        }
    }, [errorText, isButtonClicked]);

    if (!isActive) {
        return null;
    }

    return (
        <div className="create_order_modal">
            <div className="create_order_modal_wrapper">
                <button
                    className="create_order_modal_close_btn"
                    onClick={() => {
                        onClose();
                        enableBodyScroll();
                    }}
                >
                    <FilterCloseIcon />
                </button>
                <div className="create_order_modal_wrapper_child">
                    <h1 className="create_order_modal_title">Создание заказа</h1>
                    <p className="create_order_modal_info">Создание заказа стоит 10 рублей</p>

                    {/* Show error message ONLY after clicking "Разместить" */}
                    {isButtonClicked && localError && (
                        <p className="error_text" style={{marginBottom: 20, fontSize: 15, textAlign: 'center'}}>
                            {localError}
                        </p>
                    )}

                    <button className="create_order_modal_post_btn" onClick={createOrder}>
                        Разместить
                    </button>
                    <button
                        className="create_order_modal_cancel_btn"
                        onClick={() => {
                            onClose();
                            enableBodyScroll();
                        }}
                    >
                        Отменить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateOrderModal;
