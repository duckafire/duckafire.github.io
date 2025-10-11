document.querySelectorAll(".card").forEach((card) =>
{
	const BUTTON  = card.querySelector(".details-manager-button");
	const DETAILS = card.querySelector(".card-details");

	BUTTON.addEventListener("click", () =>
	{
		if(DETAILS.open)
		{
			DETAILS.open = false;
			BUTTON.classList.add("fa-plus");
			BUTTON.classList.remove("fa-minus");
		}
		else
		{
			DETAILS.open = true;
			BUTTON.classList.add("fa-minus");
			BUTTON.classList.remove("fa-plus");
		}
	});
});

document.querySelectorAll(".card-favoriter").forEach((button) =>
{
	button.addEventListener("click", () => {
		if(button.classList.contains("fa-solid"))
		{
			button.classList.add("fa-regular");
			button.classList.remove("fa-solid");
		}
		else
		{
			button.classList.add("fa-solid");
			button.classList.remove("fa-regular");
		}
	});
});
