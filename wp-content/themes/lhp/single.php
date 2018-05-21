<?php get_header(); ?>
<div id="pageContent"">
<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
	<?php get_template_part( 'entry' ); ?>
<?php endwhile; endif; ?>
</div>
<?php get_footer(); ?>