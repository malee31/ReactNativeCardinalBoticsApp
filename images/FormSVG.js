import * as React from "react"
import Svg, {Path} from "react-native-svg"
import config from "../config.json"

function SvgComponent(props) {
	return (
		<Svg viewBox="0 -4 55 70" fill={props.color || config.icons.color} width={config.icons.size} height={config.icons.size}>
			<Path d="M60.5 28.87a1.52 1.52 0 01-.44 1.06l-8.71 8.7a1.45 1.45 0 01-1.06.44 1.47 1.47 0 01-1.06-.44 1.51 1.51 0 010-2.12l7.65-7.64-1.68-1.68L53.43 29 36.6 45.8l-5.91 1 1-5.91.43-.43 3.28 3.27a1.41 1.41 0 001.06.44 1.44 1.44 0 001.06-.44 1.51 1.51 0 000-2.12l-3.28-3.28L44.8 27.74l5.49-5.49L55.1 27l2.07-2.07 2.89 2.89a1.5 1.5 0 01.44 1.05zm-1.94-5a2 2 0 000-2.82l-2.1-2.1a2 2 0 00-2.82 0l-1.19 1.15 4.93 4.9zm-21 24.84l-8.45 1.41h-.25a1.5 1.5 0 01-1.06-.44 1.52 1.52 0 01-.42-1.31l1.41-8.46a1.58 1.58 0 01.42-.81l13-13V9a2 2 0 00-2-2H15.13v10.58a1.5 1.5 0 01-1.5 1.5H8a1.5 1.5 0 010-3h4.17V9.24L4.06 17.6A2 2 0 003.5 19v36a2 2 0 002 2h34.76a2 2 0 002-2V44.38l-3.88 3.88a1.56 1.56 0 01-.82.41z"/>
		</Svg>
	)
}

export default SvgComponent