import * as React from "react"
import Svg, { Path } from "react-native-svg"
import config from "../config.json"

function SvgComponent(props) {
	return (
		<Svg
			viewBox="0 0 512 512"
			fill={props.color || config.icons.color}
			width={config.icons.size}
			height={config.icons.size}
		>
			<Path d="M503.402 228.885L273.684 19.567c-10.083-9.189-25.288-9.188-35.367-.001L8.598 228.886c-8.077 7.36-10.745 18.7-6.799 28.889 3.947 10.189 13.557 16.772 24.484 16.772h36.69v209.721c0 8.315 6.742 15.057 15.057 15.057h125.914c8.315 0 15.057-6.741 15.057-15.057V356.932h74.002v127.337c0 8.315 6.742 15.057 15.057 15.057h125.908c8.315 0 15.057-6.741 15.057-15.057V274.547h36.697c10.926 0 20.537-6.584 24.484-16.772 3.941-10.19 1.273-21.529-6.804-28.89zM445.092 42.73H343.973l116.176 105.636v-90.58c0-8.315-6.741-15.056-15.057-15.056z"/>
		</Svg>
	)
}

export default SvgComponent