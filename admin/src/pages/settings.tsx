import * as React from "react";
import * as ReactDOM from "react-dom";

import {$$, $window, _, instance} from "../lib/adapter";

import Fragment from "../components/fragment";

export type OnSettingsChangedCallback = (newSettings: Record<string, any>, hasChanges: boolean) => void;

interface SettingsProps {
	onChange: OnSettingsChangedCallback;
	settings: Record<string, any>;
}

/** Helper component for a settings label */
function Label(props) {
	return <label htmlFor={props.for} className={(props.class || []).join(" ")}>{_(props.text)} </label>;
}
/** Helper component for a tooltip */
function Tooltip(props) {
	return <img className="admin-tooltip-icon" src="../../img/info.png" title={_(props.text)} />;
}

export class Settings extends React.Component<SettingsProps, Record<string, any>> {

	constructor(props: SettingsProps) {
		super(props);
		// settings are our state
		this.state = {
			...props.settings,
		};
		// remember the original settings
		this.originalSettings = {...props.settings};

		// setup change handlers
		this.handleChange = this.handleChange.bind(this);
	}

	private onChange: OnSettingsChangedCallback;
	private originalSettings: Record<string, any>;

	// gets called when the form elements are changed by the user
	private handleChange(event: React.FormEvent<HTMLElement>) {
		const target = event.target as (HTMLInputElement | HTMLSelectElement); // TODO: more types

		// store the setting
		this.putSetting(target.id, target.value, () => {
			// and notify the admin UI about changes
			this.props.onChange(this.state, this.hasChanges());
		});
	}

	/**
	 * Reads a setting from the state object and transforms the value into the correct format
	 * @param key The setting key to lookup
	 */
	private getSetting(key: string): string | number | string[] {
		return this.state[key] as any;
	}
	/**
	 * Saves a setting in the state object and transforms the value into the correct format
	 * @param key The setting key to store at
	 */
	private putSetting(key: string, value: string | number | string[], callback?: () => void): void {
		this.setState({[key]: value as any}, callback);
	}

	/**
	 * Checks if any setting was changed
	 */
	private hasChanges(): boolean {
		for (const key of Object.keys(this.originalSettings)) {
			if (this.originalSettings[key] !== this.state[key]) return true;
		}
		return false;
	}

	public onSave(): any {
		return this.state;
	}

	public render() {
		return (
			<p key="content" className="settings-table">
				<Label for="host" text="Gateway IP/Hostname:" />
				<Tooltip text="hostname tooltip" />
				<input className="value" id="host" value={this.getSetting("host")} onChange={this.handleChange} /><br />

				<Label for="securityCode" text="Security-Code:" />
				<Tooltip text="security code tooltip" />
				<input className="value" id="securityCode" value={this.getSetting("securityCode")} onChange={this.handleChange}  />
				<span>{_("code not stored")}</span>
			</p>
		);
	}
}
