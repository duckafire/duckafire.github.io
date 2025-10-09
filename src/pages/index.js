document.querySelectorAll(".skill-details-manager").forEach((button, i) =>
{
	button.addEventListener("click", () =>
	{
		const DETAILS = document.getElementById("skill-details-" + i);

		if(DETAILS.open)
		{
			DETAILS.open = false;
			button.classList.add("fa-plus");
			button.classList.remove("fa-minus");
		}
		else
		{
			DETAILS.open = true;
			button.classList.add("fa-minus");
			button.classList.remove("fa-plus");
		}
	});
});

document.querySelectorAll(".skill-favorite-btn").forEach((button) =>
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
