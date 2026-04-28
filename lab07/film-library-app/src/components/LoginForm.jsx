import { useActionState } from "react";
import { useNavigate, Link } from "react-router";
import { Form, Button } from "react-bootstrap";

function LoginForm() {
    const navigate = useNavigate();

    const initialState = {
        email: "admin@email.com",
        password: "admin",
    }

    const handleSubmit = async (prevState, formData) => {
        // create object from formData
        const user = Object.fromEntries(formData.entries());   

        navigate("/films/filter/filter-all");
    }

    const [state, formAction] = useActionState(handleSubmit, initialState);

    return (
        <>
        <Form action={formAction} className="p-5">
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" required={true} minLength={2}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" required={true}></Form.Control>
            </Form.Group>

            <Button variant="success" type="submit" className="me-2">Login</Button>
            <Link className="btn btn-danger" to={"/films/filter/filter-all"}>Cancel</Link>
        </Form>
        </>
    );
}

export default LoginForm;