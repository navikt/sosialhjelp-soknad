declare module "react-autocomplete" {
    import * as React from "react";

    export interface AutocompleteProps {
        items: any[];
        getItemValue: any;
        renderItem: any;
        renderMenu: any;
	    onSelect: any;
	    onChange: any;
    }

    export class Autocomplete extends React.Component<AutocompleteProps, {}> {}
}