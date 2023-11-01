import useImage from "use-image";

import { Field } from "@/entities/field";
import { Image } from "react-konva";
import { Cell } from "@/models/Cell";

type ShowFieldProps = {
  intent: "black" | "white" | "active" | "fortress";
  cell: Cell;
};

function svgToURL(s: any) {
  const uri = window.btoa(decodeURI(encodeURIComponent(s)));
  return "data:image/svg+xml;base64," + uri;
}

const svg =
  '<svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg" > <path fillRule="evenodd" clipRule="evenodd" d="M19.1678 2.47573C19.2109 1.09609 20.3418 0 21.7221 0H25.5555C26.9358 0 28.0667 1.09609 28.1098 2.47573L28.1322 3.19444H29.3888C30.8002 3.19444 31.9444 4.33861 31.9444 5.75V7.29998C34.73 6.6696 37.7368 7.09067 40.2887 9.21732C45.5903 13.6353 45.1025 22.8965 38.8106 27.9622C37.2922 29.1846 36.0994 30.1981 35.278 31.2423C35.0906 31.4805 34.93 31.711 34.7949 31.9367L37.3849 32.2869C38.6524 32.4584 39.5979 33.5404 39.5979 34.8194V39.6111C39.5979 41.0225 38.4538 42.1667 37.0424 42.1667H10.2353C8.82387 42.1667 7.67971 41.0225 7.67971 39.6111V34.8194C7.67971 33.5404 8.62527 32.4584 9.89275 32.2869L12.4827 31.9367C12.3476 31.711 12.187 31.4805 11.9996 31.2423C11.1782 30.1981 9.98538 29.1846 8.467 27.9622C2.17509 22.8965 1.68728 13.6353 6.98889 9.21732C9.54087 7.09067 12.5476 6.6696 15.3333 7.29998V5.75C15.3333 4.33861 16.4774 3.19444 17.8888 3.19444H19.1454L19.1678 2.47573Z" fill="#34364C" /> <path fillRule="evenodd" clipRule="evenodd" d="M21.7224 2.55556H25.5557L25.6555 5.75H29.3891V9.58333H25.7753L25.9509 13.9233C26.0209 13.8408 26.0931 13.7599 26.1674 13.6808C29.6578 9.9712 34.8328 7.99711 38.6529 11.1806C42.4863 14.375 42.4863 21.7222 37.2082 25.9716C34.2184 28.3787 31.5404 30.6992 31.6723 34.0931L37.0426 34.8194V39.6111H10.2355V34.8194L15.6057 34.0931C15.7377 30.6992 13.0597 28.3787 10.0699 25.9716C4.79183 21.7222 4.79183 14.375 8.62516 11.1806C12.4453 7.99711 17.6203 9.9712 21.1107 13.6808C21.185 13.7599 21.2572 13.8408 21.3272 13.9233L21.5028 9.58333H17.889V5.75H21.6226L21.7224 2.55556ZM18.1114 17.2328C20.454 21.07 20.764 25.5556 20.764 27.5062C19.5899 27.5083 15.1634 25.561 12.8199 22.3641C11.1327 20.0625 10.6927 16.6478 12.139 15.3221C13.5854 13.9965 16.6473 14.8346 18.1114 17.2328ZM29.1667 17.2328C26.8241 21.07 26.514 25.5556 26.514 27.5062C27.6882 27.5083 32.1147 25.561 34.4582 22.3641C36.1454 20.0625 36.5854 16.6478 35.1391 15.3221C33.6927 13.9965 30.6308 14.8346 29.1667 17.2328Z" fill="#F4F7FA" /> </svg>';
const url = svgToURL(svg);

const ShowFigure: React.FC<ShowFieldProps> = ({ intent, cell }) => {
  const [image] = useImage(url);
  return <Field intent={intent}>{<Image image={image} />}</Field>;
};

export { ShowFigure };
