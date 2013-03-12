1stwave
=======

FirstWave Venture Center Website

**Twitter Bootstrap Structure**

The Venture Center site utilizes Twitter Bootstrap for layout and basic styling. `stylesheets/style.css` overrides these styles and provides the rest of the positioning and styling information. 

Because of the complexity of the visual design (images that bleed to the edge, with content bound in a center container), the code utilizes the `class=container` tag on elements, to give content inside `sections` a bounding box that's centered.

Example: 

	<section>
		<div id="row"> <!-- required by Bootstrap for a row definition -->
			<div class="container">
				<div class="span8"> <!-- for a two col layout, only allow this block to span 8 cols -->
					<h1>Title</h1>
					<p>Paragraph</p>
				</div>
				<div class="span4"> <!-- spans should add up to 12 -->
					<h2>Sidebar Title</h2>
					<p>Sidebar Content</p>
				</div>
			</div>
		</div>
	</section
	
No, it's not pretty, and it's far from semantic, but it works :)


				