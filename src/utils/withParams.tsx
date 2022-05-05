import { useParams } from "react-router";
import { useNavigate } from "react-router";

export default function withParams(Component: any) {
    return (props: any): JSX.Element => <Component {...props} params={useParams()} />;
}

