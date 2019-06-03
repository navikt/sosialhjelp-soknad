class KommuneMap {

	kommuner: Map<string, string>;

	constructor() {
		this.kommuner = new Map();
	}

	put(key: string, value: string) {
		this.kommuner.set(key, value);
		return this;
	}

	keys() {
		const keys: string[] = Array.from(this.kommuner.keys());
		return keys.sort((a: string, b: string): any => {
			return parseInt(a, 0) > parseInt(b, 0);
		});
	}

	build() {
		return this;
	}

}

const kommuneMap = new KommuneMap()
	.put("0701", "974605171")    // Horten
	.put("1247", "974600889")    // Askøy
	.put("0806", "995509970")    // Skien
	.put("1204", "976829786")    // Arna, Bergen kommune
	.put("1209", "976830563")    // Bergenhus, Bergen kommune
	.put("1202", "976829948")    // Fana, Bergen kommune
	.put("1205", "976830032")    // Fyllingsdalen, Bergen kommune
	.put("1206", "976830121")    // Laksevåg, Bergen kommune
	.put("1210", "976830652")    // Ytrebygda, Bergen kommune
	.put("1208", "976830172")    // Årstad, Bergen kommune
	.put("1203", "976830784")    // Åsane, Bergen kommune
	.put("0326", "970534644")    // Alna, Oslo kommune
	.put("0330", "974778874")    // Bjerke, Oslo kommune
	.put("0312", "874778702")    // Frogner, Oslo kommune
	.put("0316", "974778742")    // Gamle Oslo, Oslo kommune
	.put("0328", "974778866")    // Grorud, Oslo kommune
	.put("0315", "870534612")    // Grünerløkka, Oslo kommune
	.put("0331", "974778882")    // Nordre Aker, Oslo kommune
	.put("0318", "970534679")    // Nordstrand, Oslo kommune
	.put("0314", "974778726")    // Sagene, Oslo kommune
	.put("0313", "971179686")    // St. Hanshaugen, Oslo kommune
	.put("0327", "874778842")    // Stovner, Oslo kommune
	.put("0319", "972408875")    // Søndre Nordstrand, Oslo kommune
	.put("0335", "971022051")    // Ullern, Oslo kommune
	.put("0334", "970145311")    // Vestre Aker, Oslo kommune
	.put("0321", "974778807")    // Østensjø, Oslo kommune
	.put("5701", "892284792")    // Falkenborg, Trondheim kommune
	.put("5702", "992284838")    // Lerkendal, Trondheim kommune & Klæbu
	.put("1161", "873864192")    // Eiganes og Tasta, Stavanger kommune
	.put("1164", "976670531")    // Hillevåg og Hinna, Stavanger kommune
	.put("1162", "973864181")    // Hundvåg og Storhaug, Stavanger kommune
	.put("1165", "973864203")    // Madla, Stavanger kommune
	.put("1102", "874610712")    // Sandnes
	.put("1119", "976827961")    // Hå
	.put("1124", "948243113")    // Sola
	.put("5303", "997784618")    // Larvik
	.put("0403", "974623811")    // Hamar
	.put("1122", "974616564")    // Gjesdal
	.put("0529", "986838961")    // Vestre Toten
	.put("0626", "974545861")    // Lier
	.put("1866", "874052582")    // Hadsel
	.put("1133", "974549751")    // Hjelmeland
	.put("1135", "974617250")    // Sauda
	.put("1130", "974616734")    // Strand
	.put("0624", "994952854")    // Øvre Eiker
	.put("1134", "974616998")    // Suldal
	.put("0532", "974596016")    // Jevnaker
	.put("1401", "974551918")    // Flora
	.put("1238", "944233199")    // Kvam
	.put("1933", "921858361")    // Balsfjord og Storfjord
	.put("0221", "976637216")    // Aurskog-Høland
	.put("1224", "993975192")    // Kvinnherad
	.put("1824", "876834162")    // Vefsn
	.put("0815", "979525095")    // Kragerø
	.put("0516", "974543303")    // Nord-Fron
	.put("0519", "974543303")    // Sør-Fron
	.put("0520", "974543303")    // Ringebu
	.put("2004", "974601753")    // Hammerfest
	.put("1127", "988052310")    // Randaberg-Kvitsøy
	.put("0412", "976639618")    // Ringsaker
	.put("0426", "974550342")    // Våler (Hedmark)
	.put("1037", "964964076")    // Kvinesdal
	.put("0106", "993393851")    // Fredrikstad
	.put("0605", "976820835")    // Ringerike
	.put("0418", "964950768")    // Nord-Odal
	.put("1235", "973951270")    // Voss
	.put("2003", "974622238")    // Vadsø
	.put("1243", "992179457")    // Os (Hordaland)
	.put("0229", "974604175")    // Enebakk
	.put("1002", "964968519")    // Mandal
	.put("0514", "974592274")    // Lom
	.put("0517", "974562294")    // Sel
	.put("0513", "976641175")    // Skjåk
	.put("1219", "834210622")    // Bømlo
	.put("0515", "976641310")    // Vågå
	.put("0502", "974567776")    // Gjøvik
	.put("0906", "976825950")    // Arendal
	.build();

export default kommuneMap.keys();
