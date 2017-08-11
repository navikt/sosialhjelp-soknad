declare module "nav-frontend-alertstriper" {
    interface AlertStripe {
        type: "advarsel" | "suksess" | "info";
        solid?: boolean;
        className?: string;
    }
    const t: new (props: AlertStripe) => React.Component<AlertStripe, any>;
    export default t;
}