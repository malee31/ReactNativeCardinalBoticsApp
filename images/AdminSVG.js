import * as React from "react"
import Svg, { Path } from "react-native-svg"
import config from "../config.json"

function SvgComponent(props) {
	return (
		<Svg
			viewBox="0 0 24 24"
			fill={props.color || config.icons.color}
			width={config.icons.size}
			height={config.icons.size}
		>
			<Path d="M0 0h24v24H0V0z" fill="none"/>
			<Path d="M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z"/>
		</Svg>
	)
}

export default SvgComponent
