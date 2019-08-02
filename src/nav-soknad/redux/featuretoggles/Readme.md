# Feature toggles

Ønsker man å legge på feature toggling, kan disse reducere, sagaer og actions brukes slik:

```typescript jsx
import { hentFeatureToggles } from "featureTogglesActions";

class Eksempel extends React.Component<Props, State> {

	componentDidMount() {
		this.props.dispatch(hentFeatureToggles());
	}

	render() {
		return (
                    { soknadErLiveFeatureToggle && (
                        <h1>Velkommen</h1>
                    ) }
                    {!soknadErLiveFeatureToggle && (
                    	<h1>Kommer snart</h1>
                    )});
	}

}


export default connect((state: State) => ({
	soknadErLiveFeatureToggle: state.featuretoggles.data[ FeatureToggles.soknadErLive ],
}))(Eksempel);
```

Det er backend som bestemmer om en feature er skrudd på eller ikke.

Metoden hentFeatureToggles() gjør kall på REST endepunktet `/sendsoknad/api/feature` som inneholder en liste over features:

```javascript
{
    "feature.frontend.sosialhjelp.live":"true",
    "feature.frontend.sosialhjelp.personalia":"true",
    "feature.frontend.visvelgbosted":"true",
    "feature.frontend.arbeidsforhold":"true",
    "feature.frontend.ettersendvedlegg":"true"
}
```
