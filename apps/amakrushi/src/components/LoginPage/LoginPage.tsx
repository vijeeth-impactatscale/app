import styles from "./login.module.css";
import {
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useLocalization } from "../../hooks/useLocalization";
import { logEvent } from "firebase/analytics";
import { analytics } from "../../utils/firebase";
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [value, setValue] = React.useState("2");
  const t = useLocalization();
  // Setting the input value
  const handleNumber: React.ChangeEventHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInput(e.target.value);
  };

  const handleOTPPage: React.MouseEventHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (input.length !== 10) {
      alert("Enter a 10 digit number!");
    } else {
      fetch(
        // `${process.env.NEXT_PUBLIC_OTP_BASE_URL}uci/sendOTP?phone=${input}`,
        `https://user-service.chakshu-rd.samagra.io/uci/sendOTP?phone=${input}`,
        { method: "GET" }
      ).then((response) => {
        if (response.status === 200) {
          router.push({ pathname: "/otp", query: { state: input } });
        } else {
          alert("OTP not sent");
        }
      });
    }
  };

  useEffect(() => {
    //@ts-ignore
    logEvent(analytics, "Login_page");
  }, []);

  return (
    <div className={`${styles.main}`}>
      <div className={styles.title}>{t("title")}</div>

      <div className={styles.body}>
        <h1>{t("label.welcome")}</h1>

        {/* <RadioGroup onChange={setValue} value={value}>
          <Radio value="1">{t("label.farmer")}</Radio>
          <Radio value="2" style={{ marginLeft: "50px" }}>
            {t("label.extension_worker")}
          </Radio>
        </RadioGroup>  */}

        <NumberInput style={{ margin: "5vh auto 0px auto" }}>
          <NumberInputField
            height="45px"
            padding="18px 16px"
            borderRadius="4px"
            border="2px solid"
            borderColor="var(--secondarygreen)"
            fontWeight="400"
            fontSize="14px"
            placeholder={
              value === "1" ? "Enter adhaar number" : t('message.enter_mobile') 
            }
            value={input}
            onChange={handleNumber}
          />
        </NumberInput>
        {/* <div
          style={{
            margin: "3vh auto 0 auto",
            fontSize: "18px",
            color: "var(--font)",
          }}
        >
          {t("message.register_message")}
        </div> */}
        <button className={styles.submitButton} onClick={handleOTPPage}>
          {t("label.continue")}
        </button>
        {/* <div className={styles.signup}>
          <div>{t("message.not_register_yet")}</div>
          <div
            onClick={() => router.push("/register")}
            style={{
              color: "var(--secondarygreen)",
            }}
          >
            {t("message.register_at_krushak")}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
