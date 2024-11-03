import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type savedDataType = {
  hash_sum: string;
  transaction: string;
  description: string;
  api_key: string;
  amount: string | number;
  email: string;
  custom_data: {
    values: {
      card_number: string | number;
      date_card: string | number;
      cvv: string | number;
      sum: string | number;
      name: string | number;
      message: string | number;
    };
  };
};

function ResultPage() {
  const [savedData, setSavedData] = useState<savedDataType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("formData");
    if (data) {
      setSavedData(JSON.parse(data));
    }

    if (!data) {
      navigate("/");
    }
  }, []);

  const removeData = () => {
    localStorage.removeItem("formData");
    navigate("/");
  };

  return (
    <section>
      {savedData && (
        <>
          <p>amount: {savedData.amount}</p>
          <p>api_key: {savedData.api_key}</p>
          <p>description: {savedData.description}</p>
          <p>email: {savedData.email}</p>
          <p>hash_sum: {savedData.hash_sum}</p>
          <p>transaction: {savedData.transaction}</p>
          <p>custom_data: </p>

          <p>
            {" _ "}card_number: {savedData.custom_data.values.card_number}
          </p>
          <p>
            {" _ "}cvv: {savedData.custom_data.values.cvv}
          </p>
          <p>
            {" _ "}date_card: {savedData.custom_data.values.date_card}
          </p>
          <p>
            {" _ "}message: {savedData.custom_data.values.message}
          </p>
          <p>
            {" _ "}name: {savedData.custom_data.values.name}
          </p>
          <p>
            {" _ "}sum: {savedData.custom_data.values.sum}
          </p>
          <br />
          <button onClick={removeData}>удалить данные</button>
        </>
      )}
    </section>
  );
}

export default ResultPage;
