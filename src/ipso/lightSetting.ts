import IPSODevice from "./ipsoDevice";
import {IPSOObject, PropertyDefinition} from "./ipsoObject";

export default class LightSetting extends IPSODevice {

	constructor(sourceObj, ...properties: PropertyDefinition[]) {
		super(sourceObj, ...properties,
			["5706", "color", "f1e0b5"], // hex string
			["5707", "UNKNOWN1", 0], // ???
			["5708", "UNKNOWN2", 0], // ???
			["5709", "colorX", 0], // int
			["5710", "colorY", 0], // int
			["5711", "UNKNOWN3", 0], // ???
			["5851", "dimmer", 0], // <int> [0..254]
			["5850", "onOff", false], // <bool>
		);
	}
}