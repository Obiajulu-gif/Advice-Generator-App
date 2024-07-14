import React, { useEffect, useState } from "react";
// Import SVG file paths
import diceIcon from "../assets/icon-dice.svg";
import patternDividerDesktop from "../assets/pattern-divider-desktop.svg";
import patternDividerMobile from "../assets/pattern-divider-mobile.svg";

const Card = () => {
	const [advice, setAdvice] = useState({ id: "", text: "" });

	// Extracted advice-fetching logic into a separate function
	const fetchAdvice = () => {
		fetch("https://api.adviceslip.com/advice")
			.then((response) => response.json())
			.then((data) => {
				setAdvice({
					id: data.slip.id,
					text: data.slip.advice,
				});
			})
			.catch((error) => {
				console.log("Error Fetching advice:", error);
				setAdvice({
					...advice,
					text: "Failed to load advice. Please try again later",
				});
			});
	};
	// Call fetchAdvice on component mount
	useEffect(() => {
		fetchAdvice();
	}, []);
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-900">
			<div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-lg mx-4 sm:mx-auto relative">
				<div className="text-center mb-4 hover:text-green-500 transition duration-300">
					<p className="text-green-400 uppercase text-sm tracking-wide">
						Advice #{advice.id}
					</p>
				</div>
				<p
					className="text-center font-semibold mb-4 hover:text-green-500 transition duration-300"
					style={{ fontSize: "28px" }}
				>
					{advice.text || "Loading Advice..."}
				</p>
				<div className="hidden sm:block mb-4 ">
					<img
						src={patternDividerDesktop}
						alt="Pattern Divider Desktop"
						className="mx-auto"
					/>
				</div>
				<div className="block sm:hidden mb-4">
					<img
						src={patternDividerMobile}
						alt="Pattern Divider Mobile"
						className="mx-auto"
					/>
				</div>
				<div className="absolute bottom-18 left-1/2 transform -translate-x-1/2">
					<button onClick={fetchAdvice} className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 hover:scale-105 transition duration-300">
						<img src={diceIcon} alt="Dice Icon" className="w-6 h-6" />
					</button>
				</div>
			</div>
		</div>
	);
};
export default Card;
