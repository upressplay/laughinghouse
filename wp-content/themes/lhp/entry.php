<div id="headerImg">
	<img src="<?php if ( has_post_thumbnail() ) { the_post_thumbnail_url(); } ?>"/>
</div>
<h1 class="pageSecTitle"> <?php the_title(); ?> </h1>
<div class="pageBody">
	<?php the_content(); ?>
</div>