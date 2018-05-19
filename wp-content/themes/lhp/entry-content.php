<div id="headerImg" style="background-image: url(<?php if ( has_post_thumbnail() ) { the_post_thumbnail_url('header'); } ?>)">
</div>
<div class="pageBody">
	<?php the_content(); ?>
</div>
