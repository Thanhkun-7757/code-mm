import { useState } from "react";
import "./App.css";

// Helper function to remove diacritics and convert to uppercase
const removeDiacritics = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
};

function App() {
  const [idCard, setIdCard] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [gender, setGender] = useState("male");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "idCard":
        setIdCard(value);
        break;
      case "name":
        setName(value);
        break;
      case "dateOfBirth":
        setDateOfBirth(value);
        break;
      case "expirationDate":
        setExpirationDate(value);
        break;
      case "gender":
        setGender(value);
        break;
      default:
        break;
    }
  };

  const generateCode = () => {
    // Lấy 9 số cuối của ID card
    const last9DigitsOfIdCard = idCard.slice(-9);

    // Tạo số nguyên ngẫu nhiên
    const random1 = Math.floor(Math.random() * 10);
    const random2 = Math.floor(Math.random() * 10);
    const random3 = Math.floor(Math.random() * 10);
    const random4 = Math.floor(Math.random() * 10);

    // Đảo ngược chuỗi ngày sinh
    const reversedDate = dateOfBirth.replace(
      /(\d{2})\/(\d{2})\/(\d{4})/,
      "$3-$2-$1"
    );
    const reversedDateParts = reversedDate.split("-");
    const twoDigitYears = reversedDateParts[0].substr(-2);
    const reversedDateYYMMDD =
      twoDigitYears + reversedDateParts[1] + reversedDateParts[2];

    // Định dạng ngày hết hạn
    const formattedExpirationDate = expirationDate.replace(
      /(\d{2})\/(\d{2})\/(\d{4})/,
      "$3-$2-$1"
    );
    const formattedExpirationDateParts = formattedExpirationDate.split("-");
    const formattedExpirationDateDDMM =
      formattedExpirationDateParts[2] + formattedExpirationDateParts[1];
    const twoDigitYear = formattedExpirationDateParts[0].substr(-2);
    const formattedExpirationDateDDMMYY =
      formattedExpirationDateDDMM + twoDigitYear;

    // Xử lý tên để loại bỏ dấu và chuyển thành chữ in hoa
    const formattedName = removeDiacritics(name).split(" ");
    const formattedNameWithSymbols = formattedName
      .map((part, index) => (index < 1 ? `${part}<` : `<${part}`))
      .join("");
    // Xác định ký tự giới tính
    const genderChar = gender === "male" ? "M" : "F";

    // Tạo mã IDVNM
    const idvnmCode = (
      <span className="text__idvnm">
        IDVNM<span>{last9DigitsOfIdCard}</span>
        <span>{random1}</span>
        <span>{idCard}</span>
        {"<<"}
        <span>{random2}</span>
        <span>{reversedDateYYMMDD}</span>
        <span>{random3}</span>
        <span>{genderChar}</span>
        <span>{formattedExpirationDateDDMMYY}</span>
        <span>{random4}</span>
        VNM
        {"<<<<<<<<<<"}
        <span>{random1}</span>
        <span>{formattedNameWithSymbols}</span>
        {"<<<<<<<<<<"}
      </span>
    );

    setGeneratedCode(idvnmCode);

    setGeneratedCode(idvnmCode);
  };

  const copyToClipboard = () => {
    if (generatedCode) {
      navigator.clipboard.writeText(generatedCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="App">
      <h1>Tạo mã IDVNM</h1>

      <div className="container__form-input input-fields">
        <label className="label__title">ID Card:</label>
        <input
          className="input__form"
          type="text"
          name="idCard"
          value={idCard}
          onChange={handleInputChange}
        />

        <label className="label__title">Name:</label>
        <input
          className="input__form"
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />

        <label className="label__title">Date:</label>
        <input
          className="input__form"
          type="date"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleInputChange}
        />

        <label className="label__title">Expiration Date:</label>
        <input
          className="input__form"
          type="date"
          name="expirationDate"
          value={expirationDate}
          onChange={handleInputChange}
        />

        <label className="label__title">Gender:</label>
        <select
          className="input__form"
          name="gender"
          value={gender}
          onChange={handleInputChange}
        >
          <option value="male">Nam</option>
          <option value="female">Nữ</option>
        </select>
      </div>

      <button className="generate__button" onClick={generateCode}>
        Tạo mã
      </button>

      {generatedCode && (
        <div className="generated-code">
          <p>Mã IDVNM:</p>
          <pre className="text__result">{generatedCode}</pre>
          <button className="copy-button" onClick={copyToClipboard}>
            {isCopied ? "Đã sao chép" : "Sao chép"}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
