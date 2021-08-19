import {BodyShort, Label} from "@navikt/ds-react";
import {FormattedMessage} from "react-intl";
import styled from "styled-components";

const List = styled.ul`
    list-style: none;
    border-left: 2px solid #e7e9e9;

    margin: 0;
    padding: 0.5rem 0 0.5rem 1rem;
`;

const ListItem = styled.li`
    p {
        display: inline;
    }
`;

export const Systeminfo = (props: {systeminfoMap: {key: string; verdi?: string}[]}) => {
    return (
        <List>
            {props.systeminfoMap
                .filter((elem) => elem.verdi)
                .map((elem) => (
                    <ListItem key={elem.key}>
                        <Label size="s">
                            <FormattedMessage id={elem.key} />
                        </Label>
                        <BodyShort size="s">: {elem.verdi}</BodyShort>
                    </ListItem>
                ))}
        </List>
    );
};
