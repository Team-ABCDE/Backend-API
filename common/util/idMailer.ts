import nodemailer from "nodemailer";

export const idMailer = async (name: string, email: string) => {
  console.log("user => ", process.env.GMAIL_ADDRESS);
  console.log("pw => ", process.env.GMAIL_PASSWORD);
  const transporter = await nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com", // gmail server
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOption = {
    from: "Countryside",
    to: email,
    subject: "Countryside 아이디 찾기 결과 입니다",
    html: `You got a message from <br /> 
      ${name} 님, 찾으시는 이메일은 <br/>
      ${email} 입니다.<br/>
      `,
  };

  try {
    await transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log("이메일 전송 완료 ", info.response);
        transporter.close();
      }
    });
    return "success";
  } catch (error) {
    return error;
  }
};
