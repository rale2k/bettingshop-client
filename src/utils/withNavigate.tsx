import { useNavigate } from "react-router";

export default function withNavigate(Component: any) {
    return (props: any): JSX.Element => <Component {...props} navigate={useNavigate()} />;
}
