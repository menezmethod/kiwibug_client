export function Form(props: { [x: string]: any; children: any; }) {
    const { children, ...other } = props;
    return (
        <form autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}