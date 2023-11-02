import React from "react";
import { Image } from "react-konva";
import useImage from "use-image";

type FigureProps = {
  intent:
    | "whiteShatra"
    | "blackShatra"
    | "whiteBiy"
    | "blackBiy"
    | "whiteBaatyr"
    | "blackBaatyr"
    | undefined;

};

function svgToURL(s: any) {
  const uri = window.btoa(unescape(encodeURIComponent(s)));
  return "data:image/svg+xml;base64," + uri;
}

const blackShatra = `<svg width="46" height="46" viewBox="0 0 26 34" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M18.8108 6.71693C18.8108 8.55224 18.0295 10.2051 16.7813 11.3609L19.9973 13.631V17.791H16.849C17.0008 19.7193 18.238 21.6491 19.8389 23.3323C21.5379 25.1187 23.5821 26.5595 24.9396 27.3352L25.1388 27.4491V33.6111H0.222168V27.4491L0.421446 27.3352C1.77895 26.5595 3.82306 25.1187 5.52206 23.3323C7.123 21.6491 8.36021 19.7193 8.51203 17.791H5.3637V13.631L8.35885 11.5168C7.00934 10.3563 6.15471 8.63642 6.15471 6.71693C6.15471 3.22205 8.98787 0.388885 12.4828 0.388885C15.9776 0.388885 18.8108 3.22205 18.8108 6.71693Z" fill="#34364C" /> </svg>`;
const whiteShatra = `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M14.763 26.2756C14.4581 26.6918 14.0943 27.1252 13.6702 27.5711C12.1736 29.1447 10.3381 30.4394 9.15342 31.1163L8.95414 31.2302C8.1579 31.6852 7.6665 32.532 7.6665 33.4491V39.6111C7.6665 41.0225 8.81067 42.1667 10.2221 42.1667H35.1387C36.5501 42.1667 37.6943 41.0225 37.6943 39.6111V33.4491C37.6943 32.532 37.2029 31.6852 36.4066 31.2302L36.2074 31.1163C35.0227 30.4394 33.1872 29.1447 31.6906 27.5711C31.2665 27.1252 30.9027 26.6918 30.5978 26.2756C31.7194 26.0054 32.5527 24.9955 32.5527 23.791V19.6311C32.5527 18.8007 32.1493 18.0221 31.4709 17.5432L30.3855 16.7771C31.0118 15.5602 31.3662 14.1794 31.3662 12.7169C31.3662 7.81066 27.3889 3.83334 22.4826 3.83334C17.5764 3.83334 13.599 7.81066 13.599 12.7169C13.599 14.2616 13.9943 15.7149 14.6876 16.9801L13.8898 17.5432C13.2115 18.0221 12.808 18.8007 12.808 19.6311V23.791C12.808 24.9955 13.6414 26.0054 14.763 26.2756Z" fill="#34364C" /> <path d="M28.8108 12.7169C28.8108 14.5522 28.0295 16.2051 26.7813 17.3609L29.9973 19.631V23.791H26.849C27.0008 25.7193 28.238 27.649 29.8389 29.3323C31.5379 31.1187 33.5821 32.5595 34.9396 33.3352L35.1388 33.4491V39.6111H10.2222V33.4491L10.4214 33.3352C11.779 32.5595 13.8231 31.1187 15.5221 29.3323C17.123 27.649 18.3602 25.7193 18.512 23.791H15.3637V19.631L18.3589 17.5168C17.0093 16.3563 16.1547 14.6364 16.1547 12.7169C16.1547 9.22205 18.9879 6.38889 22.4828 6.38889C25.9776 6.38889 28.8108 9.22205 28.8108 12.7169Z" fill="#F4F7FA" /> </svg>`;
const whiteBiy = `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M19.1678 2.47573C19.2109 1.09609 20.3418 0 21.7221 0H25.5555C26.9358 0 28.0667 1.09609 28.1098 2.47573L28.1322 3.19444H29.3888C30.8002 3.19444 31.9444 4.33861 31.9444 5.75V7.29998C34.73 6.6696 37.7368 7.09067 40.2887 9.21732C45.5903 13.6353 45.1025 22.8965 38.8106 27.9622C37.2922 29.1846 36.0994 30.1981 35.278 31.2423C35.0906 31.4805 34.93 31.711 34.7949 31.9367L37.3849 32.2869C38.6524 32.4584 39.5979 33.5404 39.5979 34.8194V39.6111C39.5979 41.0225 38.4538 42.1667 37.0424 42.1667H10.2353C8.82387 42.1667 7.67971 41.0225 7.67971 39.6111V34.8194C7.67971 33.5404 8.62527 32.4584 9.89275 32.2869L12.4827 31.9367C12.3476 31.711 12.187 31.4805 11.9996 31.2423C11.1782 30.1981 9.98538 29.1846 8.467 27.9622C2.17509 22.8965 1.68728 13.6353 6.98889 9.21732C9.54087 7.09067 12.5476 6.6696 15.3333 7.29998V5.75C15.3333 4.33861 16.4774 3.19444 17.8888 3.19444H19.1454L19.1678 2.47573Z" fill="#34364C" /> <path fillRule="evenodd" clipRule="evenodd" d="M21.7224 2.55556H25.5557L25.6555 5.75H29.3891V9.58333H25.7753L25.9509 13.9233C26.0209 13.8408 26.0931 13.7599 26.1674 13.6808C29.6578 9.9712 34.8328 7.99711 38.6529 11.1806C42.4863 14.375 42.4863 21.7222 37.2082 25.9716C34.2184 28.3787 31.5404 30.6992 31.6723 34.0931L37.0426 34.8194V39.6111H10.2355V34.8194L15.6057 34.0931C15.7377 30.6992 13.0597 28.3787 10.0699 25.9716C4.79183 21.7222 4.79183 14.375 8.62516 11.1806C12.4453 7.99711 17.6203 9.9712 21.1107 13.6808C21.185 13.7599 21.2572 13.8408 21.3272 13.9233L21.5028 9.58333H17.889V5.75H21.6226L21.7224 2.55556ZM18.1114 17.2328C20.454 21.07 20.764 25.5556 20.764 27.5062C19.5899 27.5083 15.1634 25.561 12.8199 22.3641C11.1327 20.0625 10.6927 16.6478 12.139 15.3221C13.5854 13.9965 16.6473 14.8346 18.1114 17.2328ZM29.1667 17.2328C26.8241 21.07 26.514 25.5556 26.514 27.5062C27.6882 27.5083 32.1147 25.561 34.4582 22.3641C36.1454 20.0625 36.5854 16.6478 35.1391 15.3221C33.6927 13.9965 30.6308 14.8346 29.1667 17.2328Z" fill="#F4F7FA" /> </svg>`;
const blackBiy = `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M19.1678 2.47573C19.2109 1.09609 20.3418 0 21.7221 0H25.5555C26.9358 0 28.0667 1.09609 28.1098 2.47573L28.1322 3.19444H29.3888C30.8002 3.19444 31.9444 4.33861 31.9444 5.75V7.29998C34.73 6.6696 37.7368 7.09067 40.2887 9.21732C45.5903 13.6353 45.1025 22.8965 38.8106 27.9622C37.2922 29.1846 36.0994 30.1981 35.278 31.2423C35.0906 31.4805 34.93 31.711 34.7949 31.9367L37.3849 32.2869C38.6524 32.4584 39.5979 33.5404 39.5979 34.8194V39.6111C39.5979 41.0225 38.4538 42.1667 37.0424 42.1667H10.2353C8.82387 42.1667 7.67971 41.0225 7.67971 39.6111V34.8194C7.67971 33.5404 8.62527 32.4584 9.89275 32.2869L12.4827 31.9367C12.3476 31.711 12.187 31.4805 11.9996 31.2423C11.1782 30.1981 9.98538 29.1846 8.467 27.9622C2.17509 22.8965 1.68728 13.6353 6.98889 9.21732C9.54087 7.09067 12.5476 6.6696 15.3333 7.29998V5.75C15.3333 4.33861 16.4774 3.19444 17.8888 3.19444H19.1454L19.1678 2.47573Z" fill="#F4F7FA" /> <path fillRule="evenodd" clipRule="evenodd" d="M21.7224 2.55554H25.5557L25.6555 5.74999H29.3891V9.58332H25.7753L25.9509 13.9233C26.0209 13.8408 26.0931 13.7598 26.1674 13.6808C29.6578 9.97118 34.8328 7.99709 38.6529 11.1805C42.4863 14.375 42.4863 21.7222 37.2082 25.9716C34.2184 28.3787 31.5404 30.6992 31.6723 34.0931L37.0426 34.8194V39.6111H10.2355V34.8194L15.6057 34.0931C15.7377 30.6992 13.0597 28.3787 10.0699 25.9716C4.79183 21.7222 4.79183 14.375 8.62516 11.1805C12.4453 7.99709 17.6203 9.97118 21.1107 13.6808C21.185 13.7598 21.2572 13.8408 21.3272 13.9233L21.5028 9.58332H17.889V5.74999H21.6226L21.7224 2.55554ZM18.1114 17.2328C20.454 21.07 20.764 25.5555 20.764 27.5062C19.5899 27.5083 15.1634 25.561 12.8199 22.3641C11.1327 20.0625 10.6927 16.6478 12.139 15.3221C13.5854 13.9965 16.6473 14.8346 18.1114 17.2328ZM29.1667 17.2328C26.8241 21.07 26.514 25.5555 26.514 27.5062C27.6882 27.5083 32.1147 25.561 34.4582 22.3641C36.1454 20.0625 36.5854 16.6478 35.1391 15.3221C33.6927 13.9965 30.6308 14.8346 29.1667 17.2328Z" fill="#34364C" /> </svg>`;
const whiteBaatyr = `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M11.4998 6.3889C11.4998 7.0197 11.6013 7.62663 11.7888 8.1943L10.5273 8.78604C9.48155 7.70203 8.01385 7.0278 6.38867 7.0278C3.21303 7.0278 0.638672 9.60216 0.638672 12.7778C0.638672 15.6086 2.68426 17.9616 5.37789 18.4392L8.40756 28.8267C8.4708 29.0435 8.56251 29.251 8.68029 29.4437L10.4264 32.3011L10.4157 32.303C9.19501 32.5189 8.30534 33.5798 8.30534 34.8195V39.6111C8.30534 41.0225 9.4495 42.1667 10.8609 42.1667L35.1878 42.1667C35.8656 42.1667 36.5156 41.8974 36.9949 41.4182C37.4741 40.9389 37.7434 40.2889 37.7434 39.6111V34.8195C37.7434 33.5784 36.8517 32.5167 35.6293 32.3023L35.5779 32.2933L37.3193 29.4437C37.4371 29.251 37.5288 29.0435 37.592 28.8267L40.6217 18.4392C43.3153 17.9616 45.3609 15.6086 45.3609 12.7778C45.3609 9.60216 42.7865 7.0278 39.6109 7.0278C37.9837 7.0278 36.5143 7.70373 35.4683 8.79013L34.2091 8.19945C34.3977 7.6303 34.4998 7.02161 34.4998 6.3889C34.4998 3.21326 31.9254 0.638901 28.7498 0.638901C25.5741 0.638901 22.9998 3.21326 22.9998 6.3889C22.9998 3.21326 20.4254 0.638901 17.2498 0.638901C14.0741 0.638901 11.4998 3.21326 11.4998 6.3889Z" fill="#34364C" /> <path d="M18.3966 9.37135C19.5943 8.91055 20.4443 7.74898 20.4443 6.38889C20.4443 4.62464 19.0141 3.19444 17.2499 3.19444C15.4857 3.19444 14.0554 4.62464 14.0554 6.38889C14.0554 8.01924 15.2768 9.36433 16.8545 9.5591L15.4299 21.0833L8.56241 15.1187C9.19035 14.5354 9.58323 13.7025 9.58323 12.7778C9.58323 11.0135 8.15302 9.58334 6.38878 9.58334C4.62454 9.58334 3.19434 11.0135 3.19434 12.7778C3.19434 14.542 4.62454 15.9722 6.38878 15.9722C6.69935 15.9722 6.99957 15.9279 7.28346 15.8452L10.861 28.1111L14.5606 34.165L10.861 34.8194V39.6111L35.1879 39.6111V34.8194L31.4409 34.1623L35.1388 28.1111L38.7163 15.8452C39.0002 15.9279 39.3004 15.9722 39.611 15.9722C41.3753 15.9722 42.8055 14.542 42.8055 12.7778C42.8055 11.0135 41.3753 9.58334 39.611 9.58334C37.8468 9.58334 36.4166 11.0135 36.4166 12.7778C36.4166 13.7025 36.8094 14.5354 37.4374 15.1187L30.5699 21.0833L29.1453 9.5591C30.723 9.36433 31.9443 8.01924 31.9443 6.38889C31.9443 4.62464 30.5141 3.19444 28.7499 3.19444C26.9857 3.19444 25.5554 4.62464 25.5554 6.38889C25.5554 7.74898 26.4055 8.91055 27.6032 9.37135L22.9999 19.8056L18.3966 9.37135Z" fill="#F4F7FA" /> </svg>`;
const blackBaatyr = `<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M11.4998 6.3889C11.4998 7.0197 11.6013 7.62663 11.7888 8.1943L10.5273 8.78604C9.48155 7.70203 8.01385 7.0278 6.38867 7.0278C3.21303 7.0278 0.638672 9.60216 0.638672 12.7778C0.638672 15.6086 2.68426 17.9616 5.37789 18.4392L8.40756 28.8267C8.4708 29.0435 8.56251 29.251 8.68029 29.4437L10.4264 32.3011L10.4157 32.303C9.19501 32.5189 8.30534 33.5798 8.30534 34.8195V39.6111C8.30534 41.0225 9.4495 42.1667 10.8609 42.1667L35.1878 42.1667C35.8656 42.1667 36.5156 41.8974 36.9949 41.4182C37.4741 40.9389 37.7434 40.2889 37.7434 39.6111V34.8195C37.7434 33.5784 36.8517 32.5167 35.6293 32.3023L35.5779 32.2933L37.3193 29.4437C37.4371 29.251 37.5288 29.0435 37.592 28.8267L40.6217 18.4392C43.3153 17.9616 45.3609 15.6086 45.3609 12.7778C45.3609 9.60216 42.7865 7.0278 39.6109 7.0278C37.9837 7.0278 36.5143 7.70373 35.4683 8.79013L34.2091 8.19945C34.3977 7.6303 34.4998 7.02161 34.4998 6.3889C34.4998 3.21326 31.9254 0.638901 28.7498 0.638901C25.5741 0.638901 22.9998 3.21326 22.9998 6.3889C22.9998 3.21326 20.4254 0.638901 17.2498 0.638901C14.0741 0.638901 11.4998 3.21326 11.4998 6.3889Z" fill="#F4F7FA" /> <path d="M18.3966 9.37135C19.5943 8.91055 20.4443 7.74898 20.4443 6.38889C20.4443 4.62464 19.0141 3.19444 17.2499 3.19444C15.4857 3.19444 14.0554 4.62464 14.0554 6.38889C14.0554 8.01924 15.2768 9.36433 16.8545 9.5591L15.4299 21.0833L8.56241 15.1187C9.19035 14.5354 9.58323 13.7025 9.58323 12.7778C9.58323 11.0135 8.15302 9.58334 6.38878 9.58334C4.62454 9.58334 3.19434 11.0135 3.19434 12.7778C3.19434 14.542 4.62454 15.9722 6.38878 15.9722C6.69935 15.9722 6.99957 15.9279 7.28346 15.8452L10.861 28.1111L14.5606 34.165L10.861 34.8194V39.6111L35.1879 39.6111V34.8194L31.4409 34.1623L35.1388 28.1111L38.7163 15.8452C39.0002 15.9279 39.3004 15.9722 39.611 15.9722C41.3753 15.9722 42.8055 14.542 42.8055 12.7778C42.8055 11.0135 41.3753 9.58334 39.611 9.58334C37.8468 9.58334 36.4166 11.0135 36.4166 12.7778C36.4166 13.7025 36.8094 14.5354 37.4374 15.1187L30.5699 21.0833L29.1453 9.5591C30.723 9.36433 31.9443 8.01924 31.9443 6.38889C31.9443 4.62464 30.5141 3.19444 28.7499 3.19444C26.9857 3.19444 25.5554 4.62464 25.5554 6.38889C25.5554 7.74898 26.4055 8.91055 27.6032 9.37135L22.9999 19.8056L18.3966 9.37135Z" fill="#34364C" /> </svg>`;

const FigureEntities: React.FC<FigureProps> = ({ intent }) => {
  const currentFigure =
    intent === "blackBaatyr"
      ? blackBaatyr
      : intent === "whiteBaatyr"
      ? whiteBaatyr
      : intent === "whiteShatra"
      ? whiteShatra
      : intent === "blackShatra"
      ? blackShatra
      : intent === "whiteBiy"
      ? whiteBiy
      : intent === "blackBiy"
      ? blackBiy
      : undefined;

  const url = svgToURL(currentFigure);
  const [image] = useImage(url);

  return (
    <>
      {intent === "whiteShatra" ? (
        <Image
          image={image}
          x={10}
          y={10}
          width={55}
          height={55}
          alt="whiteShatra"
        />
      ) : intent === "blackShatra" ? (
        <Image
          image={image}
          x={10}
          y={10}
          width={55}
          height={55}
          alt="whiteShatra"
        />
      ) : intent === "whiteBiy" ? (
        <Image
          image={image}
          x={10}
          y={10}
          width={55}
          height={55}
          alt="whiteBiy"
        />
      ) : intent === "blackBiy" ? (
        <Image
          image={image}
          x={10}
          y={10}
          width={55}
          height={55}
          alt="blackBiy"
        />
      ) : intent === "whiteBaatyr" ? (
        <Image
          image={image}
          x={10}
          y={10}
          width={55}
          height={55}
          alt="whiteBaatyr"
        />
      ) : intent === "blackBaatyr" ? (
        <Image
          image={image}
          x={10}
          y={10}
          width={55}
          height={55}
          alt="blackBaatyr"
        />
      ) : (
        <></>
      )}
    </>
  );
};

export { FigureEntities };
