<?php get_header(); ?>
	<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

		<div id="headerImg" style="background-image: url(<?php if ( has_post_thumbnail() ) { the_post_thumbnail_url('header'); } ?>)">
		</div>
		<div class="pageBody">
			<?php the_content(); ?>
		</div>
		<?php if( have_rows('page_gallery') ): ?>
			<h2 class="pageSecTitle">
				PRODUCTIONS
			</h2>
		    <?php while( have_rows('page_gallery') ): the_row(); ?>
		       <?php
					$post_object = get_sub_field('page_object');
					if( $post_object ): 
						$post = $post_object;
						setup_postdata( $post ); 
						?>
						<a href="<?php the_permalink(); ?>"><div class="pageThumb"><div class="pageThumbImg"><img src="<?php the_post_thumbnail_url('thumb'); ?>"/></div><h3 class="pageThumbTitle"><?php the_title(); ?></h3></div></a>
					    <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>
					<?php endif; ?>
		    <?php endwhile; ?>
		<?php endif; ?>
		<?php if( have_rows('news_gallery') ): ?>
			<h2 class="pageSecTitle">
				NEWS
			</h2>
		    <?php while( have_rows('news_gallery') ): the_row(); ?>
		       <?php
					$post_object = get_sub_field('page_object');
					if( $post_object ): 
						$post = $post_object;
						setup_postdata( $post ); 
						?>
						<a href="<?php the_permalink(); ?>">
					    <div class="pageThumb">
					    	<div class="pageThumbImg">
					    	 	<img src="<?php the_post_thumbnail_url('thumb'); ?>"/>
					    	</div>
					    	<h3 class="pageThumbTitle"><?php the_title(); ?></h3>
					    </div>
					    </a>
					    <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>
					<?php endif; ?>
		    <?php endwhile; ?>
		<?php endif; ?>
		<?php if( have_rows('sevices_gallery') ): ?>
			<h2 class="pageSecTitle">
				SERVICES
			</h2>
		    <?php while( have_rows('sevices_gallery') ): the_row(); ?>
		       <?php
					$post_object = get_sub_field('page_object');
					if( $post_object ): 
						$post = $post_object;
						setup_postdata( $post ); 
						?>
						<a href="<?php the_permalink(); ?>">
					    <div class="pageThumb">
					    	<div class="pageThumbImg">
					    	 	<img src="<?php the_post_thumbnail_url('thumb'); ?>"/>
					    	</div>
					    	<h3 class="pageThumbTitle"><?php the_title(); ?></h3>
					    </div>
					    </a>
					    <?php wp_reset_postdata(); // IMPORTANT - reset the $post object so the rest of the page works correctly ?>
					<?php endif; ?>
		    <?php endwhile; ?>
		<?php endif; ?>
<?php endwhile; endif; ?>
<?php get_footer(); ?>